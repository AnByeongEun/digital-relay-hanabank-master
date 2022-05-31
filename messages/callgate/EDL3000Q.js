const moment = require('moment');
const CommonEDL = require('./common/CommonEDL');
const utils = require(global._resolve('/common/utils'));

/**
 * EDL Send : EDL 컨텐츠 전송 요청
 *   고객 단말 화면에 컨텐츠 페이지를 노출하기 위한 요청
 */
module.exports = class EDL3000Q extends CommonEDL {
  constructor({ ani, url }) {
    super();
    this.messageType = this.constructor.name;
    this.userMdn = ani || '';
    this.sessionId = `${this.userMdn}${utils.generateRandomString(9)}`;
    this.timestamp = moment().format('YYYYMMDDHHmmss');
    this.url = url || process.env.CALLGATE_INTRO_LINK; // URL Encoding 필요할 수 있음
    this.urlSize = utils.getByteLength(this.url).toString();
  }

  makeRequestBody(messageType) {
    const rawBody = messageType.padding(10) // EDL1000Q
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16)
      + this.sessionId.padding(20)
      + this.timestamp.padding(14)
      + this.urlSize.padding(4)
      + this.url.padding(this.urlSize);
    return this.encryptBody(this.key, rawBody);
  }
};