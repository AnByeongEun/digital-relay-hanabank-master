module.exports = class StatContactView {
  constructor(params) {
    this.DARS_STATE = params.viewState;
    this.EVT_TYPE = params.eventType;
    this.SYSTEM_STATE = params.systemState;
    this.CONTACT_KEY = params.contactKey;
    this.WEB_KEY = params.webKey;
    this.CALL_KEY = params.callKey;
    this.LINK_KEY = params.linkKey;
    this.CH_TYPE = params.channelType;
    this.ANI = params.ani;
    this.DNIS = params.dnis;
    this.CUS_NO = params.customerNo;
    this.CUS_TYPE = params.customerType;
    this.BAD_CUS_YN = params.isBadCustomer ? 'Y' : 'N';
    this.AGE = params.age;
    this.GENDER = params.gender;
    this.LOGIN = params.isLoggedIn ? 'Y' : 'N';
    this.LOGIN_TIME = params.loggedInTime;
    this.SVC = params.serviceId;
    this.SKL = params.skillCode;
    this.REQ_AGT_TIME = params.agentReqTime;
    this.CON_DEVICE = params.contactDevice;
    this.CON_BROWSER = params.contactBrowser;
    this.CON_OS = params.contactOs;
    this.INB_TYPE = params.inbType;
    this.SEND_TYPE = params.sendType;
    this.SVC_TYPE = params.serviceType;
    this.LINK_SVC = params.linkService;
    this.CLICK_CNT = params.clickCount;
    this.REDIRECT_URL = params.redirectUrl;
    this.SLINK_URL = params.slinkUrl;
    this.RETURN_YN = params.isReturn ? 'Y' : 'N';
    this.STATS_YN = params.isShortcut ? 'Y' : 'N';
    this.CUS_YN = params.isCustomer ? 'Y' : 'N';
    this.LAST_SVC = params.lastService;
    this.LS_SVC_1 = params.lastService1;
    this.LS_SVC_2 = params.lastService2;
    this.LS_SVC_3 = params.lastService3;
  }
};