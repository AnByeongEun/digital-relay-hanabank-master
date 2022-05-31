// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const RequestModel = require(`../models/${process.env.DATABASE_TYPE}/request.model`);

exports.getRequestParamListByMethodAndPath = async (params) => {
  return await RequestModel.getRequestParamListByMethodAndPath(params);
};