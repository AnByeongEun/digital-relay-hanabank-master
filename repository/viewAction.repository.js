// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const viewActionModel = require(`../models/${process.env.DATABASE_TYPE}/viewAction.model`);

exports.createViewAction = async (params) => {
  return await viewActionModel.createViewAction(params);
};

exports.getViewActionList = async (params) => {
  return await viewActionModel.getViewActionList(params);
};

exports.updateViewActionProcessed = async (params) => {
  return await viewActionModel.updateViewActionProcessed(params);
};

exports.deleteViewAction = async (params) => {
  return await viewActionModel.deleteViewAction(params);
};
