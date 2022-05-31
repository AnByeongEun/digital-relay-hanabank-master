module.exports = class StatContactIVR {
  constructor(params) {
    this.IVR_STATE = params.ivrState;
    this.SYSTEM_STATE = params.systemState;
    this.CONTACT_KEY = params.contactKey;
    this.CALL_KEY = params.callKey;
    this.LINK_KEY = params.linkKey;
    this.CH_TYPE = params.channelType;
    this.ANI = params.ani;
    this.DNIS = params.dnis;
    this.CUS_NO = params.customerNo;
    this.CUS_TYPE = params.customerType;
    this.AGE = params.age;
    this.GENDER = params.gender;
    this.LOGIN = params.isLoggedIn ? 'Y' : 'N';
    this.SVC = params.serviceId;
    this.SKL = params.skillCode;
    this.REQ_AGT_TIME = params.agentReqTime;
    this.INB_TYPE = params.inbType;
    this.SEND_TYPE = params.sendType;
    this.SVC_TYPE = params.serviceType;
    this.LINK_SVC = params.linkService;
    this.CLICK_CNT = params.clickCount;
    this.REDIRECT_URL = params.redirectUrl;
    this.SLINK_URL = params.slinkUrl;
    this.DARS_FAIL_REASON = params.failReason;
    this.BAD_CUS_YN = params.isBadCustomer ? 'Y' : 'N';
    this.AGT_CONTACT = params.agentContact;
  }
};