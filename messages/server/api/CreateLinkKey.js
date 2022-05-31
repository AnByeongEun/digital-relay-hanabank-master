module.exports = class CreateLinkKey {
  constructor(params) {
    // this.reqTime = utils.getCurrentTime('TIME'); // ??

    this.CH_TYPE = params.channelType;
    this.CALL_KEY = params.channelKey;
    this.CONTACT_KEY = params.contactKey;
    this.ANI = params.ani;
    this.START_YMD = params.startDate;
    this.END_YMD = params.endDate;
    this.START_TIME = params.startTime;
    this.END_TIME = params.endTime;
    this.REDIRECT_URL = process.env.CALLGATE_INTRO_LINK;
    this.CLICK_CNT = params.clickCount;
    this.AUTHENTICATION = '';

    // 211006 - 채희원D 요청으로 추가
    this.INB_TYPE = params.inbType; // 1 음성, 2 재진입, 3 단품
    this.SEND_TYPE = params.sendType; // L 자동런칭, M 알림톡, S SMS, F 실패
    this.LINK_SVC = params.linkService; // 단품시 서비스 코드
    this.CUS_TYPE = params.customerType; // 고객 타입
  }
};