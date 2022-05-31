const models = require('./').models;
const sequelizeInstance = require('./').sequelize;

const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.getScheduleStatus = async (params) => {
  const result = await models.ScheduleStatus.findOne({
    where: { dateCriteria: params.dateCriteria },
  });
  return result;
};

exports.createScheduleStatus = async (params) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const scheduleStatus = await models.ScheduleStatus.create({
      scheduleName: params.scheduleName,
      nodeName: params.nodeName,
      dateCriteria: params.dateCriteria,
      status: params.status,
      totalCount: params.totalCount,
    }, { transaction: t });
    return scheduleStatus;
  });

  return result;
};

exports.updateScheduleStatus = async (params) => {
  const set = {};
  if (params.scheduleName) {
    set.scheduleName = params.scheduleName;
  }
  if (params.status) {
    set.status = params.status;
  }
  if (params.retryCount >= 0) {
    set.retryCount = params.retryCount;
  }
  if (params.totalCount >= 0) {
    set.totalCount = params.totalCount;
  }
  if (params.processedCount >= 0) {
    set.processedCount = params.processedCount;
  }
  if (params.offset >= 0) {
    set.offset = params.offset;
  }
  const result = await sequelizeInstance.transaction(async (t) => {
    const updateResult = await models.ScheduleStatus.update({
      ...set,
    }, {
      where: {
        dateCriteria: params.dateCriteria,
      },
      transaction: t,
    });
    return updateResult;
  });
  return result;
};

exports.createScheduleLock = async (params) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const scheduleLock = await models.ScheduleLock.create({
      schedulerName: params.schedulerName,
      nodeName: params.nodeName,
      dateCriteria: params.dateCriteria,
      lockUntil: params.lockUntil,
      lockedAt: params.lockedAt,
    }, { transaction: t });
    return scheduleLock;
  });
  return result;
};

exports.getScheduleLockList = async (params) => {
  const result = await models.ScheduleLock.findAll({
    where: {
      dateCriteria: params.dateCriteria,
      lockUntil: {
        [Op.gt]: new Date(),
      },
    },
  });
  return result;
};

// FIXME: 테스트 후 삭제
exports.deleteScheduleStatus = async () => {
  const result = await models.ScheduleStatus.destroy({
    where: {},
    force: true,
  });
  return result;
};

// FIXME: 테스트 후 삭제
exports.deleteScheduleLock = async () => {
  const result = await models.ScheduleLock.destroy({
    where: {},
    force: true,
  });
  return result;
};