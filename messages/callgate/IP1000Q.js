const CommonIP = require('./common/CommonIP');

// TODO: ??? 왜 없다고 나옴
// String.prototype.padding = function (size, pad = ' ') {
//   return this.padEnd(size, pad);
// };

/**
 * DMS Direct Messaging Service Send 서비스 요청
 *   해당 고객 단말(USER_MDN 기준)을 대상으로 DMS 서비스 요청을 위한 메시지
 */
module.exports = class IP1000Q extends CommonIP {
  constructor({ ani, boundType, prologueCustomUrl, epilogueCustomUrl, callerMdn }) {
    super();
    this.messageType = this.constructor.name;
    // specific fields
    this.userMdn = ani || '';
    this.boundType = boundType || 'IN'; // IN, OUT
    this.prologueCustomUrl = prologueCustomUrl || 'http://www.daum.net'; // URL Encoding 필요할 수 있음
    this.epilogueCustomUrl = epilogueCustomUrl || 'http://www.naver.com'; // URL Encoding 필요할 수 있음
    this.callerMdnCheckYn = 'N'; // N 으로 고정
    this.smsCallerMdn = callerMdn || ''; // 없으면 콜게이트에서 지정한 default caller mdn으로 발신
  }

  makeRequestBody(messageType) {
    // content header = authKey + serviceCode + userMdn
    const rawBody = messageType.padding(10) // IP1000Q
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16)
      + this.boundType.padding(3) // IN: inbound, OUT: outbound
      + this.prologueContentCode.padding(6) // 미사용시 NONE
      + this.prologueCustomUrl.padding(200)
      + this.epilogueContentCode.padding(6)
      + this.epilogueCustomUrl.padding(200)
      + this.callerMdnCheckYn.padding(1) // N 으로 고정
      + this.smsCallerMdn.padding(20); // deprecated, 구글 정책 변경으로 인해 안드로이드 9.0 이상의 단말은 현재 권한으로는 발신번호 체크를 할 수 없으므로 사용하지 않음
    return this.encryptBody(this.key, rawBody);
  }
};