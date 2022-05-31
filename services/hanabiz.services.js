const fs = require('fs');
const moment = require('moment');

const NecessaryDocumentRepository = require('../repository/necessaryDocument.repository');
const AgentSummaryRepository = require('../repository/agentSummary.repository');
const ScheduleRepository = require('../repository/schedule.repository');

const journeyApi = require('../api/journey.api');
const mciApi = require('../api/mci.api');

const messages = require('../messages');
// const JourneyError = require('../messages/error/JourneyError');
const messagesNecessaryDocumentPriorityListRepository = require('../messages/server/response/HanaNecessaryDocumentPriorityResponse');
const messagesNecessaryDocumentResponse = require('../messages/server/response/HanaNecessaryDocumentResponse');
const messagesTargetDocumentResponse = require('../messages/server/response/HanaNecessaryDocumentResponse');
const messagesBooleanResponse = require('../messages/server/common/BooleanResponse');

const { UsingJoinColumnOnlyOnOneSideAllowedError } = require('typeorm');

const logger = require(global._resolve('/modules/winston')).logger;

const { retryFrequencyMinute, allowedMaxHour } = require('../config/scheduler');
const { response } = require('express');

module.exports = class HanabizService {
  constructor() {}

  // 카카오톡 발송 요청
  async sendLinkTalk(params) {
    try {
      // TODO: MCI 전문 발송
      return await mciApi.SendKakaoTalkQ(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 영업점 정보 발송 요청
  async getBranch(params) {
    try {
      // TODO: MCI 전문 발송
      return await mciApi.getBranch(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 링크 정보 요청
  async getLinkkeyInfo(param) {
    try {
      const journeyResponse = await journeyApi.linkInfo(param);
      return journeyResponse;
      // return new messages.journey.LinkKeyData(journeyResponse);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 스마트 ARS 런칭 결과 저장
  async sarsLink(param) {
    try {
      const journeyResponse = await journeyApi.sarsLink(param);
      return journeyResponse;
      // return new messages.journey.LinkKeyData(journeyResponse);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 스마트 ARS 통계 저장
  async sarsSave(param) {
    try {
      const journeyResponse = await journeyApi.sarsSave(param);
      return journeyResponse;
      // return new messages.journey.LinkKeyData(journeyResponse);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 필요서류 우선순위 목록
  async getNecessaryDocumentPriorityList() {
    try {
      const response = await NecessaryDocumentRepository.getNecessaryDocumentPriorityList();
      return response.map(res => new messagesNecessaryDocumentPriorityListRepository(res));
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 필요서류 목록
  async getNecessaryDocumentList(groupCd) {
    try {
      const response = await NecessaryDocumentRepository.getNecessaryDocumentList({ groupCd });
      return response.map(res => new messagesNecessaryDocumentResponse(res));
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 특정 필요서류 데이터 리스트
  async getTargetDocumentList(params) {
    try {
      const response = await NecessaryDocumentRepository.getTargetDocumentList(params);

      return response;
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 공유 링크 정보 조회
  async getShareInfoDocumentList(params) {
    try {
      const response = await journeyApi.getShareInfoDocumentList(params);
      return response;
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 필요서류 우선순위 리스트 조회
  async getPriInfoDocumentList(params) {
    try {
      const response = await journeyApi.getPriInfoDocumentList(params);
      return response;
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 필요서류 우선순위 설정
  async createNecessaryDocumentPriority(params) {
    try {
      const result = await NecessaryDocumentRepository.createNecessaryDocumentPriorityDate(params);
      const priorityList = params.pri.map(p => {
        p.confType = params.confType;
        p.priGroupCd = p.group;
        p.priStepCd = p.stepCd;
        p.priStepNm = p.stepNm;
        p.priStepOd = p.stepOd;
        return p;
      });
      const result2 = await NecessaryDocumentRepository.createBulkNecessaryDocumentPriority(priorityList);

      return new messagesBooleanResponse(true);
    } catch (error) {
      console.warn(error);
      // throw error;
      return new messagesBooleanResponse(false); // ???
    }
  }

  // 필요서류 수동 배치
  async configBizSync() {
    logger.info('#### BIZ BATCH START ####');

    try {
      // HAI 필요서류 데이터 조회
      const list = await journeyApi.getNecessaryDocumentList();

      // 기존 데이터들 전부 지우고 생성
      const deleteResult = await NecessaryDocumentRepository.deleteNecessaryDocumentAll();

      let journeyBizData = [];
      let num = 0;

      let offset = 0;

      const bulkInsertCount = Number(process.env.SCHEDULER_BULK_INSERT_COUNT);

      for (; offset < list.length; offset += bulkInsertCount) {
        // insert 가능 형태로 데이터 정제
        const unit = list.slice(offset, offset + bulkInsertCount).map(a => {
          let d1 = makeNcsyDcmts(a.dtls.ncsyDcmts);
          let d2 = makeGudSntcCttsAll(a.dtls.gudSntcCtts);
          let d3 = makeGudSntcCttsN(a.dtls.gudSntcCtts);

          let d4 = makeString(a.dtls.addDcmtCtt);
          let d5 = makeString(a.dtls.ncsyDcmtGudCtt);

          const map = {
            ...a,
            ncsyDcmts: d1,
            gudSntcCttsAll: d2,
            gudSntcCttsN: d3,
            addDcmtCtt: d4,
            ncsyDcmtGudCtt: d5,
          };

          journeyBizData.push(map);
          num++;
          delete map.dtls;
          return map;
        });
        const result = await NecessaryDocumentRepository.createBulkNecessaryDocument(unit);
      }// for end

      logger.info('#### BIZ BATCH END ####');

      const dateCriteriaYMD = moment().format('YYYY-MM-DD');

      const journeySendBizTxt = {
        batchName: ['BizInfo'],
        ymd: dateCriteriaYMD,
        data: journeyBizData,
      };
      const sendBizListToJourney = await journeyApi.sendBizToJourney(journeySendBizTxt);

      return new messagesBooleanResponse(true);
    } catch (error) {
      logger.error(error);
      return new messagesBooleanResponse(false);
    }
  }

  // 필요서류 수동 배치
  async configAgtSync() {
    logger.info('#### AGT BATCH START ####');

    try {
      // HAI 필요서류 데이터 조회
      const list = await journeyApi.getNecessaryAgtList();

      let journeyAgentData = [];
      let num = 0;

      let offset = 0;

      const bulkInsertCount = Number(process.env.SCHEDULER_BULK_INSERT_COUNT);

      for (; offset < list.length; offset += bulkInsertCount) {
        // insert 가능 형태로 데이터 정제
        const unit = list.slice(offset, offset + bulkInsertCount).map(a => {
          const map = {
            haiSvcGrpCd: a.haiSvcGrpCd,
            ncsyDcmmtDvCd: a.ncsyDcmmtDvCd,
            step1: a.step1,
            step2: a.step2,
            step3: a.step3,
            step4: a.step4,
            step5: a.step5,
            step6: a.step6,
            cnt: a.cnt,
            bascDt: a.bascDt,
          };

          journeyAgentData.push(map);
          return map;
        });
        const result = await AgentSummaryRepository.createBulkAgentSummary(unit);
      }// for end

      logger.info('#### AGT BATCH END ####');

      const dateCriteriaYMD = moment().format('YYYY-MM-DD');

      const journeySendAgtTxt = {
        batchName: ['AgtInfo'],
        ymd: dateCriteriaYMD,
        data: journeyAgentData,
      };
      const sendAgentListToJourney = await journeyApi.sendAgtToJourney(journeySendAgtTxt);

      return new messagesBooleanResponse(true);
    } catch (error) {
      logger.error(error);
      return new messagesBooleanResponse(false);
    }
  }

  async migrateDatabaseManually(reqTime) {
    const dateCriteria = reqTime ? moment(reqTime, 'YYYYMMDDHHmmssSSS').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    return this.migrateDatabase(dateCriteria);
  }

  // 영업점 데이터, 상담사 통계 이관
  async migrateDatabase(dateCriteria) {
    try {
      // NecessaryDocument, AgentSummary를 순차적으로 migration

      const dateCriteriaYMD = moment().format('YYYY-MM-DD');
      // 현재 진행해야 하는 스케쥴 정보 등록 (default: NecessaryDocument)
      let currentSchedule = 'NecessaryDocument';
      let offset = 0;

      let scheduleStatus = await ScheduleRepository.getScheduleStatus({ dateCriteria });

      if (!scheduleStatus) {
        // 첫번째 작업 시도, 상태 최초 생성시 중복 생성을 피하기 위해 여기서 생성 (isScheduleTriggerAvailable에서 생성하면 중복 생성 가능성 있음)
        scheduleStatus = await ScheduleRepository.createScheduleStatus({
          scheduleName: currentSchedule,
          nodeName: process.env.HOST_NAME,
          dateCriteria: dateCriteria,
          status: 'Processing',
        });
      } else {
        // 이미 완료된 경우 작업 중단
        if (scheduleStatus.status === 'Complete' || scheduleStatus.status === 'Failed') {
          return new messages.server.common.BooleanResponse(scheduleStatus.status === 'Complete');
        }

        // 재시도일 경우 retryCount + 1
        await ScheduleRepository.updateScheduleStatus({
          dateCriteria: dateCriteria,
          retryCount: scheduleStatus.retryCount + 1,
        });

        currentSchedule = scheduleStatus.scheduleName;
        offset = scheduleStatus.offset;
      }

      // ===================> currentSchedule, scheduleStatus 는 값이 있는 상태

      const bulkInsertCount = Number(process.env.SCHEDULER_BULK_INSERT_COUNT);

      const writeFile = (scheduleName, list) => {
        const filepath = process.env.DB_MIGRATION_FILE_PATH;
        const fullpath = `${filepath}/${scheduleName}_${dateCriteria}.json`;

        // 디렉토리 없으면 생성
        if (!fs.existsSync(filepath)) {
          fs.mkdirSync(filepath);
        }

        // 파일 이미 있으면 다시 남기지 않음
        if (!fs.existsSync(fullpath)) {
          try {
            fs.writeFileSync(fullpath, JSON.stringify(list));
            // fs.writeFileSync(fullpath, JSON.stringify(list, null, 2)); // print pretty
          } catch (error) {
            fs.unlink(fullpath, (err) => { // 쓰기 실패시 파일 삭제
              logger.warn(err);
            });
          }
        }
      };

      if (currentSchedule === 'NecessaryDocument') {
        // 기존 데이터들 전부 지우고 생성
        const deleteResult = await NecessaryDocumentRepository.deleteNecessaryDocumentAll();

        // HAI 필요서류 데이터 조회
        const list = journeyApi.getNecessaryDocumentList();

        // API를 통해 요청한 정보 전체를 파일에 쓰기 (파일이 없는 경우만 생성)
        // writeFile(currentSchedule, list);

        let journeyBizData = [];
        let num = 0;

        for (; offset < list.length; offset += bulkInsertCount) {
          // insert 가능 형태로 데이터 정제
          const unit = list.slice(offset, offset + bulkInsertCount).map(a => {
            let d1 = makeNcsyDcmts(a.dtls.ncsyDcmts);
            let d2 = makeGudSntcCttsAll(a.dtls.gudSntcCtts);
            let d3 = makeGudSntcCttsN(a.dtls.gudSntcCtts);

            let d4 = makeString(a.dtls.addDcmtCtt);
            let d5 = makeString(a.dtls.ncsyDcmtGudCtt);

            const map = {
              ...a,
              ncsyDcmts: d1,
              gudSntcCttsAll: d2,
              gudSntcCttsN: d3,
              addDcmtCtt: d4,
              ncsyDcmtGudCtt: d5,
            };

            journeyBizData.push(map);
            num++;
            delete map.dtls;
            return map;
          });
          const result = await NecessaryDocumentRepository.createBulkNecessaryDocument(unit);

          // 실질적으로 offset 만 변경되지만 일단 넣어주자
          const status = await ScheduleRepository.updateScheduleStatus({
            dateCriteria: dateCriteria,
            scheduleName: currentSchedule,
            status: 'Processing',
            totalCount: list.length,
            processedCount: unit.length,
            offset: offset + unit.length,
          });
        }

        const journeySendBizTxt = {
          batchName: ['BizInfo'],
          ymd: dateCriteriaYMD,
          data: journeyBizData,
        };
        const sendBizListToJourney = await journeyApi.sendBizToJourney(journeySendBizTxt);

        currentSchedule = 'AgentSummary'; // 필요서류 작업 종료 후 currentSchedule 값 변경
        offset = 0; // 필요서류 작업 종료 후 offset 초기화

        // status update NecessaryDocument에서 AgentSummary로 넘어가는 과정에서만 초기화 필요
        await ScheduleRepository.updateScheduleStatus({
          dateCriteria: dateCriteria,
          scheduleName: currentSchedule,
          totalCount: 0,
          processedCount: 0,
          offset: offset,
        });
      }
      let journeyAgentData = [];
      if (currentSchedule === 'AgentSummary') {
        // HAI 필요서류 데이터 조회
        const list = await journeyApi.getNecessaryAgtList();
        // const list = require('../api/data/ncsy_summary.json'); // TODO: 특정 날짜별 요약 통계 조회 API로 수정 필요

        // API를 통해 요청한 정보 전체를 파일에 쓰기 (파일이 없는 경우만 생성)
        writeFile(currentSchedule, list);

        for (; offset < list.length; offset += bulkInsertCount) {
          // insert 가능 형태로 데이터 정제
          const unit = list.slice(offset, offset + bulkInsertCount).map(a => {
            const map = {
              haiSvcGrpCd: a.haiSvcGrpCd,
              ncsyDcmmtDvCd: a.ncsyDcmmtDvCd,
              step1: a.step1,
              step2: a.step2,
              step3: a.step3,
              step4: a.step4,
              step5: a.step5,
              step6: a.step6,
              cnt: a.cnt,
              bascDt: a.bascDt,
            };

            journeyAgentData.push(map);
            return map;
          });
          const result = await AgentSummaryRepository.createBulkAgentSummary(unit);

          // 실질적으로 offset 만 변경되지만 일단 넣어주자
          const status = await ScheduleRepository.updateScheduleStatus({
            dateCriteria: dateCriteria,
            scheduleName: currentSchedule,
            status: 'Processing',
            totalCount: list.length,
            processedCount: unit.length,
            offset: offset + unit.length,
          });
        }
      }

      // 모두 완료되면 Complete로 상태 변경
      await ScheduleRepository.updateScheduleStatus({ dateCriteria, status: 'Complete' });

      const journeySendAgtTxt = {
        batchName: ['AgtInfo'],
        ymd: dateCriteriaYMD,
        data: journeyAgentData,
      };
      const sendAgentListToJourney = await journeyApi.sendAgtToJourney(journeySendAgtTxt);
      // TODO: 완료되면 Journey에 해당 data 전달? 확인 필요

      return new messages.server.common.BooleanResponse(true); // 수동 api 요청에 대한 응답
    } catch (error) {
      logger.warn(error);

      // 해당 일의 마지막 trigger 가능 시간 계산하여 처리 여부 결정 (마지막: Failed, 그 외 Aborted)
      const quota = 60 % retryFrequencyMinute === 0 ? 60 / retryFrequencyMinute - 1 : 60 / retryFrequencyMinute;
      const finalMinute = retryFrequencyMinute * quota;
      const lastTriggerTime = `${allowedMaxHour}${finalMinute}`;
      const status = moment().format('HHmm') === lastTriggerTime ? 'Failed' : 'Aborted';

      const result = await ScheduleRepository.updateScheduleStatus({ dateCriteria, status });

      return new messages.server.common.BooleanResponse(false); // 수동 api 요청에 대한 응답
    }
  }

  async sendBizPriority(params) {
    try {
      const journeyResponse = await journeyApi.sendBizPriority(params);

      return journeyResponse;
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 저니 통계 이력 전송
  async sendHistory() {
    try {
      const fs = require('fs');
      const date = moment().format('YYYYMMDD') - 1;

      fs.readFile(`./var/logs/journey/LOG_AICC_MOUTIMODAL_RELAY_JOURNEY_${date}.log`, 'utf8', function (err, data) {
        return data;
      });
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }
};

function makeNcsyDcmts(params) {
  let dataArr = null;

  if (params != null && params.length > 0) {
    dataArr = { arr: params };
    return JSON.stringify(dataArr);
  } else {
    return null;
  }
}

function makeGudSntcCttsAll(params) {
  let dataArr = { arr: null };
  let guArrAll = [];

  if (params.length > 0) {
    for (let j = 0; j < params.length; j++) {
      guArrAll.push(params[j].gudSntcCtt);
    }
    dataArr.arr = guArrAll;
  } else {
    dataArr.arr = [];
  }
  if (guArrAll.length > 0) {
    return JSON.stringify(dataArr);
  } else {
    return null;
  }
}

function makeGudSntcCttsN(params) {
  let dataArr = { arr: null };
  let guArrN = [];

  if (params.length > 0) {
    for (let j = 0; j < params.length; j++) {
      if (params[j].smsTgtYn == 'Y') {
        guArrN.push(params[j].gudSntcCtt);
      }
    }

    dataArr.arr = guArrN;
  } else {
    dataArr.arr = [];
  }
  if (guArrN.length > 0) {
    return JSON.stringify(dataArr);
  } else {
    return null;
  }
}

function makeString(params) {
  let dataArr = { arr: null };

  if (params != null) {
    let tArr = [];
    tArr.push(params);

    dataArr = tArr;

    return JSON.stringify(dataArr);
  } else {
    return null;
  }
}