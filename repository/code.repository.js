// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const CodeModel = require(`../models/${process.env.DATABASE_TYPE}/code.model`);

exports.getCommonCode = async (params) => {
  return await CodeModel.getCommonCode(params);
};

exports.getCommonCodeListByGroup = async (params) => {
  return await CodeModel.getCommonCodeListByGroup(params);
};