// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const ScheduleModel = require(`../models/${process.env.DATABASE_TYPE}/schedule.model`);

exports.getScheduleStatus = async (params) => {
  return await ScheduleModel.getScheduleStatus(params);
};

exports.createScheduleStatus = async (params) => {
  return await ScheduleModel.createScheduleStatus(params);
};

exports.updateScheduleStatus = async (params) => {
  return await ScheduleModel.updateScheduleStatus(params);
};

exports.createScheduleLock = async (params) => {
  return await ScheduleModel.createScheduleLock(params);
};

exports.getScheduleLockList = async (params) => {
  return await ScheduleModel.getScheduleLockList(params);
};

// FIXME: 테스트 후 삭제
exports.deleteScheduleStatus = async (params) => {
  return await ScheduleModel.deleteScheduleStatus(params);
};

// FIXME: 테스트 후 삭제
exports.deleteScheduleLock = async (params) => {
  return await ScheduleModel.deleteScheduleLock(params);
};