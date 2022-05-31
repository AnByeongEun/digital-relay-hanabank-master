// const NecessaryDocumentModel = require(`../models/${process.env.DATABASE_TYPE}/necessaryDocument.model`);
const NecessaryDocumentModel = require('../models/mysql/necessaryDocument.model'); // oracle 사용 안함

/* ===================================================
 * NecessaryDocument
 * =================================================== */

exports.createBulkNecessaryDocument = async (params) => {
  return await NecessaryDocumentModel.createBulkNecessaryDocument(params);
};

// 필요서류 전체 리스트
exports.getNecessaryDocumentList = async (params) => {
  return await NecessaryDocumentModel.getNecessaryDocumentList(params);
};

// 필요서류 이전/다음 목록 뎁스 리스트
exports.getNecessaryDocumentListByCodes = async (params) => {
  return await NecessaryDocumentModel.getNecessaryDocumentListByCodes(params);
};

// 필요서류 전체 삭제
exports.deleteNecessaryDocumentAll = async (params) => {
  return await NecessaryDocumentModel.deleteNecessaryDocumentAll(params);
};

/* ===================================================
 * NecessaryDocumentPriority
 * =================================================== */

exports.createBulkNecessaryDocumentPriority = async (params) => {
  return await NecessaryDocumentModel.createBulkNecessaryDocumentPriority(params);
};

// 우선순위 조회
exports.getNecessaryDocumentPriorityList = async () => {
  return await NecessaryDocumentModel.getNecessaryDocumentPriorityList();
};

// 공유 링크 정보 조회
exports.getShareInfoDocumentList = async () => {
  return await NecessaryDocumentModel.getShareInfoDocumentList();
};

/* ===================================================
 * NecessaryDocumentPriorityDate
 * =================================================== */

exports.createNecessaryDocumentPriorityDate = async (params) => {
  return await NecessaryDocumentModel.createNecessaryDocumentPriorityDate(params);
};