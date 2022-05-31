const journeyApi = require('../api/journey.api');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class StatService {
  constructor() {}

  // 고객 접근 이력 저장 요청 (IVR)
  async saveContactStats (params) {
    try {
      const journeyResponse = await journeyApi.divrIvr(params);
      logger.debug('journeyResponse : ', journeyResponse);
      return journeyResponse.data;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // Thru 이력 저장 요청
  async saveViewStats (params) {
    try {
      const journeyResponse = await journeyApi.divrMobile(params);
      logger.debug('journeyResponse : ', journeyResponse);
      return journeyResponse.data;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // 필요서류 이력 저장 요청
  async saveNecessaryDocument (params) {
    try {
      const journeyResponse = await journeyApi.bizHistory(params);
      logger.debug('journeyResponse : ', journeyResponse);
      return journeyResponse.data;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // 영업점 이력 저장 요청
  async saveBranch (params) {
    try {
      const journeyResponse = await journeyApi.branchHistory(params);
      logger.debug('journeyResponse : ', journeyResponse);
      return journeyResponse.data;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // 스마트 ARS 런칭결과 저장
  async sarsLink (params) {
    try {
      const journeyResponse = await journeyApi.sarsLink(params);
      logger.debug('journeyResponse : ', journeyResponse);
      return journeyResponse.data;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // 스마트 ARS 통계 저장
  async sarsSave (params) {
    try {
      const journeyResponse = await journeyApi.sarsSave(params);
      logger.debug('journeyResponse : ', journeyResponse);
      return journeyResponse.data;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }
};
