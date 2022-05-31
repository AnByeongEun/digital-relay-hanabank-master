const CommonEDL = require('./common/CommonEDL');

/**
 * EDL Check : EDL 서비스 체크 요청
 *   EDL0000Q 사용 여부와 유효성 응답 여부 등을 종합 판단하여, 서비스 가능 여부 와 플랫폼 종류를 확인하기 위한 요청
 */
module.exports = class EDL1000Q extends CommonEDL {
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