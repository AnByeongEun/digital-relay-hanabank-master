const models = require('./').models;

exports.getUserGroupList = async (params) => { // TODO: 필터 필요시 추가
  const where = {};
  const result = await models.UserGroup.findAll({ where });
  return result;
};
