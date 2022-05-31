const CommonEDL = require('./common/CommonEDL');

/**
 * EDL Wakeup : EDL 서비스 시작 요청
 *   고객 단말에 서비스 시작을 위하여 FCM이나 APNS 푸쉬를 요청
 */
module.exports = class EDL2000Q extends CommonEDL {
  constructor({ ani }) {
    super();
    this.messageType = this.constructor.name;
    this.userMdn = ani || '';
  }

  makeRequestBody(messageType) {
    const rawBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16);
    return this.encryptBody(this.key, rawBody);
  }
};