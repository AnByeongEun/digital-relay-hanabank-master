const ContactRepository = require('../repository/contact.repository');
const ServiceDenialUserRepository = require('../repository/serviceDenialUser.repository');

const journeyApi = require('../api/journey.api');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class ContactService {
  constructor() {}

  // 컨택키 생성
  async ContactKeyCreate(message) {
    try {
      const journeyResponse = await journeyApi.ContactKeyCreate(message);
      return journeyResponse;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // 링크키 생성
  async LinkKeyCreate(message) {
    try {
      const journeyResponse = await journeyApi.LinkKeyCreate(message);
      return journeyResponse;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  // 링크 생성 이력 저장
  async LinkKeyCreateSave(message) {
    try {
      const journeyResponse = await journeyApi.LinkKeyCreateSave(message);
      return journeyResponse;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  async getBatch(message) {
    try {
      const journeyResponse = await journeyApi.getBatch(message);
      return journeyResponse;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }

  async SendLinkSave(message) {
    try {
      const journeyResponse = await journeyApi.SendLinkSave(message);
      return journeyResponse;
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }
};