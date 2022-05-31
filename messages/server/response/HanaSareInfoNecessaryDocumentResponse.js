const BranchDataQ = require('../../mci/BranchDataQ');

module.exports = class HanaTargetDocumentResponse {
  constructor(response) {
    this.startTime = response.startTime;
    this.ymd = response.ymd;
    this.hh24mi = response.hh24mi;
    this.chType = response.chType;
    this.contactKey = response.contactKey;
    this.callKey = response.callKey;
    this.webKey = response.webKey;
    this.linkKey = response.linkKey;
    this.dnis = response.dnis;
    this.svcType = response.svcType;

    if (response.svcType == 'DL') {
      this.biz = {};
      this.biz.bizStep1Cd = response.bizStep1Cd;
      this.biz.bizStep1Nm = response.bizStep1Nm;
      this.biz.bizStep2Cd = response.bizStep2Cd;
      this.biz.bizStep2Nm = response.bizStep2Nm;
      this.biz.bizStep3Cd = response.bizStep3Cd;
      this.biz.bizStep3Nm = response.bizStep3Nm;
      this.biz.bizStep4Cd = response.bizStep4Cd;
      this.biz.bizStep4Nm = response.bizStep4Nm;
      this.biz.bizStep5Cd = response.bizStep5Cd;
      this.biz.bizStep5Nm = response.bizStep5Nm;
      this.biz.bizStep6Cd = response.bizStep6Cd;
      this.biz.bizStep6Nm = response.bizStep6Nm;
      this.biz.ncsyDcmts = response.ncsyDcmts;
      this.biz.gudSntcCttsAll = response.gudSntcCttsAll;
      this.biz.gudSntcCttsN = response.gudSntcCttsN;
      this.biz.addDcmtCtt = response.addDcmtCtt;
      this.biz.ncsyDcmtGudCtt = response.ncsyDcmtGudCtt;

      this.branch = {};
      this.branch.barnchTargetText = '';
      this.branch.branchAddr = '';
      this.branch.wayAddr = '';
      this.branch.parkInfo = '';
      this.branch.branchAni = '';
      this.branch.branchFax = '';
      this.branch.branch365 = '';
      this.branch.branchBh = '';
      this.branch.brNo = '';
      this.branch.brSeqNo = '';
      this.branch.comCanTrsDvCd = '';
      this.branch.hanaFncHldgsGrcoCd = '';
    }

    if (response.svcType == 'BL') {
      this.biz = {};
      this.biz.bizStep1Cd = '';
      this.biz.bizStep1Nm = '';
      this.biz.bizStep2Cd = '';
      this.biz.bizStep2Nm = '';
      this.biz.bizStep3Cd = '';
      this.biz.bizStep3Nm = '';
      this.biz.bizStep4Cd = '';
      this.biz.bizStep4Nm = '';
      this.biz.bizStep5Cd = '';
      this.biz.bizStep5Nm = '';
      this.biz.bizStep6Cd = '';
      this.biz.bizStep6Nm = '';
      this.biz.ncsyDcmts = '';
      this.biz.gudSntcCttsAll = '';
      this.biz.gudSntcCttsN = '';
      this.biz.addDcmtCtt = '';
      this.biz.ncsyDcmtGudCtt = '';

      this.branch = {};
      this.branch.barnchTargetText = response.barnchTargetText;
      this.branch.branchAddr = response.branchAddr;
      this.branch.wayAddr = response.wayAddr;
      this.branch.parkInfo = response.parkInfo;
      this.branch.branchAni = response.branchAni;
      this.branch.branchFax = response.branchFax;
      this.branch.branch365 = response.branch365;
      this.branch.branchBh = response.branchBh;
      this.branch.brNo = response.brNo;
      this.branch.brSeqNo = response.brSeqNo;
      this.branch.comCanTrsDvCd = response.comCanTrsDvCd;
      this.branch.hanaFncHldgsGrcoCd = response.hanaFncHldgsGrcoCd;
    }
  }
};