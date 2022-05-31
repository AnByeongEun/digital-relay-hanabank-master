// TODO: relay common 에서는 규격화 필요
module.exports = class SARS0003 {
  constructor(m) {
    // Header
    this.chType = m.chType;
    this.callKey = m.chKey;
    this.ani = m.ani;
    this.reqDttm = m.reqDttm;
    this.bodyLength = m.bodyLength;

    // Body
    this.modalState = m.body.substring(0, 1).trim();
    this.webKey = m.body.substring(1, 31).trim();
    this.linkKey = m.body.substring(31, 51).trim();
    this.svcType = m.body.substring(51, 61).trim();
    this.svcName = m.body.substring(61, 81).trim();
    this.dnis = m.body.substring(81, 101).trim();
    this.userAgent = {};
    this.userAgent.conOS = m.body.substring(101, 116).trim();
    this.userAgent.conDevice = m.body.substring(116, 131).trim();
    this.userAgent.conBrowser = m.body.substring(131, 146).trim();
    this.userAgent.lastFlag = m.body.substring(146, 147).trim();
  }
};