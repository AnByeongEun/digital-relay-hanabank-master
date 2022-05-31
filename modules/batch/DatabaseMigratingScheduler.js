const cron = require('node-cron'); // https://github.com/node-cron/node-cron
const moment = require('moment');

const ScheduleRepository = require('../../repository/schedule.repository');

const HanabizService = new (require('../../services/hanabiz.services'));

const config = require('../../config/scheduler');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class DatabaseMigratingScheduler {
  constructor(schedulerName) {
    this.date = moment();
    this.schedulerName = schedulerName;
  }

  getDateCriteria() {
    return this.date.format('YYYY-MM-DD');
  }

  getLockUntil() {
    const lockUntil = config.retryFrequencyMinute * 60 * 0.8; // 기준이 되는 분을 초 단위로 환산한 후 x0.8
    return moment().second(0).millisecond(0).add(lockUntil, 'second');
  }

  async isScheduleTriggerAvailable() {
    // TODO: 영업일 등은 필요시 설정
    const hour = this.date.format('HH');
    // schedule job의 cron expression에서 filtering 하고 있지만 추가로 제약
    if (config.allowedMinHour <= hour && hour <= config.allowedMaxHour) {
      const response = await ScheduleRepository.getScheduleStatus({ dateCriteria: this.getDateCriteria() });

      // 완료(Complete)/실패(Failed) 등 작업 종료(성공 여부 무관) 상태가 아닌 경우 true 반환
      return !response || (response.status === 'Processing' || response.status === 'Aborted');
    }

    return false;
  }

  async hasScheduleLock() {
    const lockList = await ScheduleRepository.getScheduleLockList({ dateCriteria: this.getDateCriteria() });
    if (lockList.length === 0) { // 0일수 있나?
      return false;
    }

    const lockedAtList = lockList.map(lock => lock.lockedAt);
    const earliestLockedAt = lockedAtList.reduce((min, current) => {
      return min > current ? current : min;
    });

    if (earliestLockedAt) {
      const result = lockList.filter(lock => lock.lockedAt === earliestLockedAt);
      logger.debug(`earliestLockedAt ${earliestLockedAt}, length : ${result.length}`);
      if (result.length === 1) {
        return process.env.HOST_NAME === result[0].nodeName;
      }
      if (result.length > 1) {
        // (낮은 확률로) locked_at이 같은 노드가 있을 경우 우선순위에 따라 작업 수행할 노드 지정
        return process.env.HOST_NAME === config.priorityNode;
      }
    }

    return false;
  }

  async execute() {
    // 이 함수는 전체 노드들 중 작업을 실행할 하나의 노드만 호출됨
    // 실제 작업 내용은 해당 함수에 구현하며 해당 작업을 호출하는 역할만 수행

    // TODO: 여러 Schedule 돌릴 필요 있으면 생성자로 함수 받도록 수정, 일단은 한 함수에 몰아 넣는다
    // 작업을 진행할 Function 호출
    const result = await HanabizService.migrateDatabase(this.getDateCriteria());
  }

  job() {
    try {
      // 분 표기가 */10 이고 allowedMinHour = 1, allowedMaxHour = 5 일 경우, 01:00 ~ 05:50 까지 매 10분마다 trigger
      const expression = `*/${config.retryFrequencyMinute} ${config.allowedMinHour}-${config.allowedMaxHour} * * *`; // for test
      logger.info(`Start Database Migrating Scheduler [${expression}]`);
      return cron.schedule(expression, async () => {
        try {
          // 매 trigger마다 현재 시간(moment) 정보 class member에 할당
          this.date = moment();
          if (await this.isScheduleTriggerAvailable()) {
            // lock을 얻기 위해 정보 저장
            const result = await ScheduleRepository.createScheduleLock({
              schedulerName: this.schedulerName,
              nodeName: process.env.HOST_NAME,
              dateCriteria: this.getDateCriteria(),
              lockUntil: this.getLockUntil(),
              lockedAt: this.date.format('HHmmssSSS'),
            });

            // >>>>>>>> for test >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            //   이중화인것처럼 구현하기 위해 random 함수 사용하여 lockedAt을 다르게 저장
            //   min값이 복수개일 경우 체크하기 위해 10%확률로 같은 시간 저장하도록 함
            //   TODO: 개발 서버에 이중화 세팅 후 아래 코드 삭제
            // const result1 = await ScheduleRepository.createScheduleLock({
            //   schedulerName: this.schedulerName,
            //   nodeName: 'relay1',
            //   dateCriteria: this.getDateCriteria(),
            //   lockUntil: this.getLockUntil(),
            //   lockedAt: `${this.date.format('HHmmssSS')}${Math.floor(Math.random() * 10)}`,
            // });
            // const result2 = await ScheduleRepository.createScheduleLock({
            //   schedulerName: this.schedulerName,
            //   nodeName: 'relay2',
            //   dateCriteria: this.getDateCriteria(),
            //   lockUntil: this.getLockUntil(),
            //   lockedAt: `${this.date.format('HHmmssSS')}${Math.floor(Math.random() * 10)}`,
            // });
            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            // lock을 획득한(lockedAt이 가장 빠른) 서버만 아래 if문 통과
            if (await this.hasScheduleLock()) {
              const datetime = `${this.getDateCriteria()} ${this.date.format('HH:mm:ss.SSS')}`;
              logger.info(`[${process.env.HOST_NAME}] Do Scheduler Job at [${datetime}]`);
              await this.execute(); // TODO 후처리 필요시 await로 동기화
            }
          } else {
            logger.debug(`The schedule for [${this.getDateCriteria()}] has ended or is not available`);
          }
        } catch (error) {
          console.error(error);
        // TODO: 에러일 경우 status=> aborted, retryCount + 1 ??
        }
      });
    } catch (error) {
      logger.error(error);
    }
  }

  async startJob() {
    try {
      // FIXME: 테스트 후 삭제
      // const deleteLock = await ScheduleRepository.deleteScheduleLock();
      // console.log(`deleteLock : ${deleteLock}`);
      // const deleteStatus = await ScheduleRepository.deleteScheduleStatus();
      // console.log(`deleteStatus : ${deleteStatus}`);
      /// ///////////////////

      // 모든 node의 scheduler가 trigger 됨
      this.job().start();
    } catch (error) {
      logger.error(error);
    }
  }
};
