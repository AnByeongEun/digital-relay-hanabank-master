module.exports = class LinkKeyData {
  constructor(response) {
    if (!response.data._id) {
      response.data = response.data.LINK;
    }
    this.id = response.data._id;
    this.contactKey = response.data.CONTACT_KEY;
    this.channelKey = response.data.CH_KEY;
    this.channelType = response.data.CH_TYPE;
    this.ani = response.data.ANI;
    this.linkKey = response.data.LINK_KEY;
    this.startDate = response.data.START_YMD;
    this.endDate = response.data.END_YMD;
    this.startTime = response.data.START_TIME;
    this.endTime = response.data.END_TIME;
    this.clickCount = response.data.CLICK_CNT;
    this.authentication = response.data.AUTHENTICATION;
    this.redirectUrl = response.data.REDIRECT_URL;
    this.slinkUrl = response.data.SLINK_URL;
    // this.inbType = response.data.INB_TYPE;
    // this.sendType = response.data.SNED_TYPE; // FIXME: typo
    // this.svc = response.data.SVC;
    // this.cusType = response.data.CUS_TYPE;
    // this.vdaType = response.data.VDA_TYPE;
    this.timestamp = response.data.TIMESTAMP;
    this.ymd = response.data.YMD;
    this.hh24mi = response.data.HH24MI;
    this.createdAt = response.data.CREATE_AT;
    // this.count = response.data.COUNT;
  }
};