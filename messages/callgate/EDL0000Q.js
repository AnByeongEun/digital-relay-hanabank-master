const CommonEDL = require('./common/CommonEDL');

/**
 * EDL Valid : EDL 서비스 유효성 확인 요청
 *   Android 단말 고객인 경우에 보유중인 SDK가 현재 시점에 서비스 사용 가능한 지 확인하기 위하여 SDK들에게 유효성을 요청
 */
module.exports = class EDL0000Q extends CommonEDL {
  constructor({ ani }) {
    super();
    this.messageType = this.constructor.name;
    this.userMdn = ani || '';
  }

  makeRequestBody(messageType) {
    // content header = authKey + serviceCode + userMdn
    const rawBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16);
    return this.encryptBody(this.key, rawBody);
  }
};