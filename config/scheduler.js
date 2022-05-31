const lockLastingTime = '50m'; // 필요 없을듯, 그냥 계산하자 (retryFrequency - 10m)
const processCount = 100;

module.exports = {
  isActive: process.env.SCHEDULER_ACTIVE === 'true',
  priorityNode: process.env.SCHEDULER_PRIORITY_NODE,
  allowedMinHour: process.env.SCHEDULER_ALLOWED_MIN_HOUR, // 테스트중에는 0-24로 설정
  allowedMaxHour: process.env.SCHEDULER_ALLOWED_MAX_HOUR,
  retryFrequencyMinute: process.env.SCHEDULER_RETRY_FREQUENCY_MINUTE, // 0 - 59
};