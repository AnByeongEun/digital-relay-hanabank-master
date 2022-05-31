const UserGroupModel = require(`../models/${process.env.DATABASE_TYPE}/userGroup.model`);

exports.getUserGroupList = async (params) => {
  return await UserGroupModel.getUserGroupList(params);
};