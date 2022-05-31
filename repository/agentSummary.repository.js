const AgentSummaryModel = require('../models/mysql/agentSummary.model'); // oracle 사용 안함

/* ===================================================
 * AgentSummaryModel
 * =================================================== */

exports.createBulkAgentSummary = async (params) => {
  return await AgentSummaryModel.createBulkAgentSummary(params);
};