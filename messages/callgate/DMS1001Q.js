const urlencode = require('urlencode');
const CommonDMS = require('./common/CommonDMS');
const utils = require(global._resolve('/common/utils'));

/**
 * DMS Direct Messaging Service Send Dynamic 서비스 요청
 *   DMS1000Q와 기능적으로 동일하나, 요청 URL 컬럼의 길이를 가변으로 사용할 수 있기 하며, 최대 허용 길이가 확장 됨
 */
module.exports = class DMS1001Q extends CommonDMS {
  constructor({ ani, isDirectUrl, message, callerMdn, url }) {
    super();
    this.messageType = this.constructor.name;
    // specific fields
    // TODO: default 데이터 정의 필요
    this.userMdn = ani || '';
    this.directUrlSmsYn = isDirectUrl ? 'Y' : 'N'; // Y 일 경우 short url 이 아닌 원본 url이 전송
    this.smsText = message || '고객님, 전화를 끊지 마시고 아래 링크를 눌러주세요.';
    this.smsTextSize = utils.getByteLength(this.smsText);
    this.smsCallerMdn = callerMdn || ''; // 없으면 콜게이트에서 지정한 default caller mdn으로 발신
    this.url = url || process.env.CALLGATE_INTRO_LINK; // URL Encoding 필요할 수 있음
    this.urlSize = utils.getByteLength(this.url);
  }

  makeRequestBody(messageType) {
    // content header = authKey + serviceCode + userMdn
    const rawBody = messageType.padding(10) // DMS1000Q
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16)
      + this.contentCode.padding(6)
      + this.directUrlSmsYn.padding(1)
      + this.smsTextSize.toString().padStart(4, '0')
      + this.smsText.padding(this.smsTextSize)
      + this.smsCallerMdn.padding(16)
      + this.urlSize.toString().padStart(4, '0')
      + urlencode.decode(this.url).padding(this.urlSize);
    return this.encryptBody(this.key, rawBody);
  }
};