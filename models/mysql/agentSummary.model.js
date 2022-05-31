const models = require('.').models;
const sequelizeInstance = require('./').sequelize;

const sequelize = require('sequelize');
const Op = sequelize.Op;

/* ===================================================
 * AgentSummary
 * =================================================== */

exports.createBulkAgentSummary = async (list) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const agentSummary = await models.HanaAgentSummary.bulkCreate(list, { transaction: t });
    return agentSummary;
  });
  return result;
};