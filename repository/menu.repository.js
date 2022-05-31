// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const MenuModel = require(`../models/${process.env.DATABASE_TYPE}/menu.model`);

exports.getMenuList = async (params) => {
  return await MenuModel.getMenuList(params);
};

exports.getMenuListByGroup = async (params) => {
  return await MenuModel.getMenuListByGroup(params);
};

exports.getMenuListByUserType = async (params) => {
  return await MenuModel.getMenuListByUserType(params);
};

exports.getMenuGroupList = async (params) => {
  return await MenuModel.getMenuGroupList(params);
};