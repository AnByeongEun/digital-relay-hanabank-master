const dbConfig = require(global._resolve('/config/datasources')).oracle;
const QueryExecuter = require(global._resolve('/models/oracle/common/QueryExecuter'));

const mapperName = 'oracleApiMapper';
const executer = new QueryExecuter(dbConfig, mapperName, 'ApiModel');

const models = require('./schema');

/**
 * @param {Array} result
 * @param {Object} BaseEntity
 * @returns {Object}
 */
const findOne = (result, BaseEntity) => {
  return result.rows.length > 0 ? new BaseEntity(result.rows[0]) : null;
};

/**
 * @param {Array} result
 * @param {Object} BaseEntity
 * @returns {Object}
 */
const findAll = (result, BaseEntity) => {
  return {
    contents: result.rows.map(record => {
      return new BaseEntity(record);
    }),
    totalCount: result.rows.length,
  };
};

/**
 * xxx.model.js 에 있는 함수들은
 * 1. params를 실제 DAO에 전달하고
 * 2. DB 종류에 관계 없이 요청한 쿼리로부터 같은 형태의 응답을 받아야 함
 * 3. Oracle의 응답을 일정한 객체로 변환하는 mapper 형태의 작업 필요
 * 4. 한개만 받는지(optional로 처리), 목록을 받는지에 따라 다르게 응답 내려야 함
 */

// DB 종류별로 xx.model.js 생성하고 (ex. mysql/xx.model.js, oracle/xx.model.js)
// repository layer에서 dbms에 따라 해당 xx.model.js 파일 선택되도록 한다
// 뭐 이런식으로
//  const ApiRepository = require('../models/mysql/api.model');
//  const ApiRepository = require('../models/oracle/api.model');

/* ===================================================
 * Blacklist
 * =================================================== */

exports.countServiceDenialUser = async (params) => {
  const result = await executer.exec('countServiceDenialUser', params);
  return result.rows[0].CNT;
};

exports.getServiceDenialUser = async (params) => {
  const result = await executer.exec('getServiceDenialUser', params);
  return findOne(result, models.Blacklist);
};

/* ===================================================
 * Common Code
 * =================================================== */

// codeGroup, code 입력 필요
exports.getCommonCode = async (params) => {
  const result = await executer.exec('getCommonCode', params);
  return findOne(result, models.CommonCode);
};

// codeGroup 입력 필요
exports.getCommonCodeListByGroup = async (params) => {
  const result = await executer.exec('getCommonCodeListByGroup', params);
  return findAll(result, models.CommonCode);
};

/* ===================================================
 * External Document
 * =================================================== */

exports.getExternalDocument = async (params) => {
  const result = await executer.exec('getExternalDocument', params);
  return findOne(result, models.ExternalDocument);
};

/* ===================================================
 * API + API Params
 * =================================================== */

exports.getRequestParams = async (params) => {
  const result = await executer.exec('getRequestParams', params);
  return findAll(result, models.RequestParams);
};

/* ===================================================
 * Menu (menu, menu group, menu group sub)
 * =================================================== */

exports.getUserMenuList = async (params) => {
  /**
   * User Type
   * S: Skip, E: Employee, C: Client, N: Open??, CC: Event
   */
  const result = await executer.exec('getUserMenuList', params);
  return findAll(result, models.Menu);
};

exports.getMenuListByType = async (params) => {
  const result = await executer.exec('getMenuListByType', params);
  return findAll(result, models.Menu);
};

exports.getMenuListByParent = async (params) => {
  const result = await executer.exec('getMenuListByParent', params);
  return findAll(result, models.Menu);
};

exports.getMenuInfo = async (params) => {
  const result = await executer.exec('getMenuInfo', params);
  return findAll(result, models.Menu);
};

exports.getMenuListByUrl = async (params) => {
  const result = await executer.exec('getMenuListByUrl', params);
  return findAll(result, models.Menu);
};

/* ===================================================
 * Room (roon info, room transaction)
 * =================================================== */

exports.getRoomByCallid = async (params) => {
  const result = await executer.exec('getRoomByCallid', params);
  return findAll(result, models.Room);
};

exports.getRoomByAni = async (params) => {
  const result = await executer.exec('getRoomByAni', params);
  return findAll(result, models.Room); // TODO: findOne or last of list
};

// TODO: write는 Room mapper 객체 사용 안하고 일단..
// TODO: body params는 message type 객체로 변경 (ex. RoomCreateRequest)
exports.createRoom = async (params) => {
  return await executer.exec('createRoom', params, true);
};

// TODO: write는 Room mapper 객체 사용 안하고 일단..
// TODO: body params는 message type 객체로 변경 (ex. RoomUpdateRequest)
exports.updateRoom = async (params) => {
  return await executer.exec('updateRoom', params, true);
};

exports.getRoomTransaction = async (params) => {
  const result = await executer.exec('getRoomTransaction', params);
  return findAll(result, models.RoomTransaction);
};

/* ===================================================
 * Room Session
 * =================================================== */

exports.getRoomSessionByAccessToken = async (params) => {
  const result = await executer.exec('getRoomSessionByAccessToken', params);
  // TODO: accessToken이 unique 이면 list가 아닌 단일 객체로 응답해야 함
  return findAll(result, models.RoomSession);
};

exports.getRoomSessionByAccessTokenAndAni = async (params) => {
  const result = await executer.exec('getRoomSessionByAccessTokenAndAni', params);
  // TODO: accessToken이 unique 이면 list가 아닌 단일 객체로 응답해야 함
  return findAll(result, models.RoomSession);
};

exports.getRoomSessionByAccessTokenAndWebKey = async (params) => {
  const result = await executer.exec('getRoomSessionByAccessTokenAndWebKey', params);
  return findAll(result, models.RoomSession);
};

// TODO: body params는 message type 객체로 변경 (ex. RoomSessionCreateRequest)
exports.createRoomSession = async (params) => {
  return await executer.exec('createRoomSession', params, true);
};

// TODO: body params는 message type 객체로 변경 (ex. RoomSessionDeleteRequest)
exports.deleteRoomSession = async (params) => {
  return await executer.exec('deleteRoomSession', params, true);
};

exports.updateRoomSessionExpireTime = async (params) => {
  return await executer.exec('updateRoomSessionExpireTime', params, true);
};

exports.getRoomSessionListLessThanNow = async (params) => {
  return await executer.exec('getRoomSessionListLessThanNow', params);
};

// exp time이 초과되었는데 delete 처리 안된 room session 정보 삭제 처리
exports.deleteRoomSessionExpired = async (params) => {
  return await executer.exec('deleteRoomSessionExpired', params, true);
};

/* ===================================================
 * Server Config
 * =================================================== */

exports.getServerConfig = async (params) => {
  const result = await executer.exec('getServerConfig', params);
  return findOne(result, models.ServerConfig);
};

exports.updateServerConfigCounsel = async (params) => {
  return await executer.exec('updateServerConfigCounsel', params, true);
};

/* ===================================================
 * Service Auth History
 * =================================================== */

// web의 SMS인증여부 조회(/web/chkSMSAuth) + mci 에서 쓰긴 하는데 테이블이 없음
exports.chkServiceAuth = async (params) => {
  return await executer.exec('chkServiceAuth', params);
};

/* ===================================================
 * Service Auth History
 * =================================================== */

exports.chkServiceAuth = async (params) => {
  return await executer.exec('chkServiceAuth', params);
};

/* ===================================================
 * Etc
 * =================================================== */

exports.getSBICommonCodeInfo = async (params) => {
  return await executer.exec('getSBICommonCodeInfo', params);
};