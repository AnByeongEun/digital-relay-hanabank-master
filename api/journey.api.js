const fs = require('fs');
const moment = require('monent');
const winston = require('winston/lib/winston/config');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;
const ApiLogger = require(global._resolve('/modules/winston')).api;
const JourneyLogger = require(global._resolve('/modules/winston')).journeyLogger;

const httpClient = new (require('../modules/HttpClient'))('journey').instance;
const httpClient_Hai = new (require('../modules/HttpClient_Hai'))('journey').instance;

const utils = require(global._resolve('/common/utils'));

const getJourneyUrl = (path = '') => {
  return `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_PORT}${path}`;
};

const getLinkUrl = (path = '') => {
  return `${process.env.LINK_PROTOCOL}://${process.env.LINK_HOST}:${process.env.LINK_PORT}${path}`;
};

const getHaiUrl = (path = '') => {
  return `${process.env.HAI_PROTOCOL}://${process.env.HAI_HOST}:${process.env.HAI_PORT}${path}`;
};

const getJourneyBatchUrl = (path = '') => {
  return `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_BATCH_PORT}${path}`;
};

// TODO: 필요?
const saveERSLogFileSync = (jsonStr) => {
  const logDirectory = process.env.JOURNEY_LOG_FILE_PATH;
  const date = utils.getCurrentTime('DATE');
  // TODO: 필요시 경로 수정
  const filepath = `${logDirectory}/Relay_${date}.log`;

  const data = JSON.stringify(jsonStr);

  try {
    if (fs.existsSync(logDirectory)) {
      if (fs.existsSync(filepath)) {
        fs.appendFileSync(filepath, `\r\n${data}`);
        return true;
      } else {
        fs.writeFileSync(filepath, data);
        return true;
      }
    } else {
      fs.writeFileSync(filepath, data);
      return true;
    }
  } catch (error) {
    logger.warn('Failed to save Log file');
  }
};

module.exports = {
  // 하나은행 Journey ///////////////////////////////////////////////////////////
  async ContactKeyCreate(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/contactkey/create'), payload);
    logger.info(`/api/contactkey/create : ${response.status}`);

    return new messages.journey.JourneyResponse(response);
  },
  async LinkKeyCreate(payload) {
    const response = await httpClient.post(getLinkUrl('/api/link/create'), payload);
    logger.info(`/api/link/create : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async LinkKeyCreateSave(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/link/createResult'), payload);
    logger.info(`/api/link/createResult : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async sendLinkSave(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/link/sendResult'), payload);
    logger.info(`/api/link/sendResult : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async linkInfo(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/link/info'), payload);
    logger.info(`/api/link/info : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async bizHistory(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/biz/history'), payload);
    logger.info(`/api/biz/history : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async branchHistory(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/branch/history'), payload);
    logger.info(`/notice : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async sarsLink(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/sars/link'), payload);
    logger.info(`/api/sars/link : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async sarsSave(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/sars/save'), payload);
    logger.info(`/api/sars/save : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },

  /// //////2022-05-22 추가
  async sendBizPriority(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/config/biz/priority'), payload);
    logger.info(`/api/config/biz/priority : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async sendBizToJourney(payload) {
    const response = await httpClient.post(getJourneyBatchUrl('/jobExcute/BizInfo'), payload);
    logger.info(`/jobExcute/BizInfo : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async sendAgtToJourney(payload) {
    const response = await httpClient.post(getJourneyBatchUrl('/jobExcute/AgtInfo'), payload);
    logger.info(`/jobExcute/AgtInfo : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async getNecessaryDocumentList(payload) {
    const response = await httpClient.post(getHaiUrl('/api/message/ncsy-data?svcGrpCd=KCA'), payload);
    logger.info(`/api/config/biz/sync BIZ : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async getNecessaryAgtList(payload) {
    const dateParse = new Date();
    const yesterDay = moment(dateParse.getTime()).add(-1, 'd').format('YYYYMMDD');
    const response = await httpClient.post(getHaiUrl(`/api/message/ncsy-sumr?frDtm=${yesterDay}&toDtm=${yesterDay}`), payload);
    logger.info(`/api/config/biz/sync AGT : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async getShareInfoDocumentList(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/info/share'), payload);
    logger.info(`/api/info/share : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async getTargetInfoDocumentList(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/info/biz'), payload);
    logger.info(`/api/info/biz : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
  async getPriInfoDocumentList(payload) {
    const response = await httpClient.post(getJourneyUrl('/api/info/pri'), payload);
    logger.info(`/api/info/pri : ${response.status}`);
    return new messages.journey.JourneyResponse(response);
  },
};