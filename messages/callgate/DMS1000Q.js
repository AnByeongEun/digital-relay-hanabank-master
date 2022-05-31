const urlencode = require('urlencode');
const CommonDMS = require('./common/CommonDMS');

/**
 * DMS Direct Messaging Service Send 서비스 요청
 *   해당 고객 단말(USER_MDN 기준)을 대상으로 DMS 서비스 요청을 위한 메시지
 */
module.exports = class DMS1000Q extends CommonDMS {
  constructor({ ani, isDirectUrl, message, callerMdn, url }) {
    super();
    this.messageType = this.constructor.name;
    // specific fields
    // TODO: default 데이터 정의 필요
    this.userMdn = ani || '';
    this.directUrlSmsYn = isDirectUrl ? 'Y' : 'N';
    this.smsText = message || '고객님, 전화를 끊지 마시고 아래 링크를 눌러주세요';
    this.smsCallerMdn = callerMdn || ''; // 없으면 콜게이트에서 지정한 default caller mdn으로 발신
    this.url = url || process.env.CALLGATE_INTRO_LINK; // URL Encoding 필요할 수 있음
  }

  makeRequestBody(messageType) {
    // content header = authKey + serviceCode + userMdn
    const rawBody = messageType.padding(10) // DMS1000Q
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16)
      + this.contentCode.padding(6)
      + this.directUrlSmsYn.padding(1)
      + this.smsText.padding(120)
      + this.smsCallerMdn.padding(16)
      + urlencode.decode(this.url).padding(200);
    return this.encryptBody(this.key, rawBody);
  }
};