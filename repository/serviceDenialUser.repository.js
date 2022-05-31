// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const ServiceDenialUserModel = require(`../models/${process.env.DATABASE_TYPE}/serviceDenialUser.model`);

exports.countServiceDenialUser = async (params) => {
  return await ServiceDenialUserModel.countServiceDenialUser(params);
};

exports.getServiceDenialUser = async (params) => {
  return await ServiceDenialUserModel.getServiceDenialUser(params);
};
