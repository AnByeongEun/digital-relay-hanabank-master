const CommonVDL = require('./common/CommonVDL');
const AES256 = require('../../routes/middlewares/AES256');

/**
 * @customUrl
 * VDL 컨텐츠 코드에 대해서 등록되어 있는 URL이 아닌 Custom URL을 지 정하고자 하는 경우 사용.
 *  http://와 같은 URI scheme을 포함한 Full URL 사용
 *  '|' 사용불가
 *  Parameter에 한글 및 특수 문자가 사용된 경우 필요에 따라 URLEncoding 처리함
 */

module.exports = class VDL2000Q extends CommonVDL {
  constructor({ ani, linkKey, telecomType, message, callerMdn, isDirectUrl, directUrlMessage, extraParam, url }) {
    super();
    this.messageType = this.constructor.name;
    // specific fields
    // TODO: default 데이터 정의 필요
    this.userMdn = ani || '';
    this.telecomType = telecomType || '';
    // this.smsText = message || '고객님, 전화를 끊지 마시고 아래 링크를 눌러주세요.';
    this.smsText = message || ''; // 필수값 x
    this.smsCallerMdn = callerMdn || ''; // 없으면 콜게이트에서 지정한 default caller mdn으로 발신
    this.directUrlSmsYn = isDirectUrl ? 'Y' : 'N';
    this.directUrlSmsText = directUrlMessage || '';
    this.extraParam = extraParam || '';
    this.customUrl = url || process.env.CALLGATE_INTRO_LINK + linkKey; // URL Encoding 필요할 수 있음 => 콜게이트에서 알아서 인코딩 해주는것같음
  }

  makeRequestBody(messageType) {
    const rawBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16)
      + this.telecomType.padding(1)
      + this.contentCode.padding(6)
      + this.smsText.padding(40)
      + this.smsCallerMdn.padding(16)
      + this.directUrlSmsYn.padding(1)
      + this.directUrlSmsText.padding(80)
      + this.extraParam.padding(200)
      + this.customUrl.padding(200);

    const rawLogBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + AES256.encrypt(this.userMdn.padding(16).trim())
      + this.telecomType.padding(1)
      + this.contentCode.padding(6)
      + this.smsText.padding(40)
      + this.smsCallerMdn.padding(16)
      + this.directUrlSmsYn.padding(1)
      + this.directUrlSmsText.padding(80)
      + this.extraParam.padding(200)
      + this.customUrl.padding(200);
    return this.encryptBody(this.key, rawBody, rawLogBody);
  }
};