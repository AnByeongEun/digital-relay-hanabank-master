// TODO: 테이블 단위로 model을 나눠야 맞지만 일단..
const models = require('./').models;

const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.getCommonCode = async (params) => {
  const result = await models.CommonCode.findOne({
    where: { code: params.code }, // code는 unique 해야함
  });
  return result;
};

exports.getCommonCodeListByGroup = async (params) => {
  const where = {};
  if (params.codeGroup) {
    where.codeGroup = params.codeGroup;
  }
  const result = await models.CommonCode.findAll({ where });
  return result;
};