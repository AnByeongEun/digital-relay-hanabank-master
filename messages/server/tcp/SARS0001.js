// TODO: relay common 에서는 규격화 필요
module.exports = class SARS0001 {
  constructor(m) {
    // Header
    this.chType = m.chType;
    this.chKey = m.chKey;
    this.ani = m.ani;
    this.reqDttm = m.reqDttm;

    // Body
    this.linkKey = m.body.substring(0, 20).trim();
    this.svcType = m.body.substring(20, 30).trim();
    this.svcName = m.body.substring(30, 50).trim();
    this.dnis = m.body.substring(50, 70).trim();
    this.slinkUrl = m.body.substring(70, 270).trim();
    this.redirectUrl = m.body.substring(270, 470).trim();
    this.startYmd = m.body.substring(470, 478).trim();
    this.endYmd = m.body.substring(478, 486).trim();
    this.startTime = m.body.substring(486, 490).trim();
    this.endTime = m.body.substring(490, 494).trim();
    this.clickCnt = m.body.substring(494, 498).trim();
    this.telecomType = m.body.substring(498, 499).trim();
    this.platformType = m.body.substring(499, 509).trim();
    this.svcSupportYn = m.body.substring(509, 510).trim();
    this.launcherSupportYn = m.body.substring(510, 511).trim();
    this.invokeType = m.body.substring(511, 513).trim();
    this.phoneType = m.body.substring(513, 514).trim();
    this.vdlCode = m.body.substring(514, 518).trim();
    this.vdlType = m.body.substring(518, 520).trim();
  }
};