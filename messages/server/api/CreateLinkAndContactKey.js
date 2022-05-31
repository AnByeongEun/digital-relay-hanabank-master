/**
 * 하나은행 멀티모달 링크키+컨택키 생성 용도
 */
module.exports = class CreateLinkAndContactKey {
  constructor(params) {
    this.chKey = params.chKey;
    this.chType = params.chType;
    this.svcType = params.svcType;
    this.ani = params.ani;
    this.dnis = params.dnis;
    this.startYmd = params.startYmd;
    this.endYmd = params.endYmd;
    this.startTime = params.startTime;
    this.endTime = params.endTime;
    this.clickCnt = params.clickCnt;

    this.previewYn = params.previewYn;
    this.lastBizStep = params.lastBizStep;
    this.bizStep1Cd = params.bizStep1Cd;
    this.bizStep1Nm = params.bizStep1Nm;
    this.bizStep2Cd = params.bizStep2Cd;
    this.bizStep2Nm = params.bizStep2Nm;
    this.bizStep3Cd = params.bizStep3Cd;
    this.bizStep3Nm = params.bizStep3Nm;
    this.bizStep4Cd = params.bizStep4Cd;
    this.bizStep4Nm = params.bizStep4Nm;
    this.bizStep5Cd = params.bizStep5Cd;
    this.bizStep5Nm = params.bizStep5Nm;
    this.bizStep6Cd = params.bizStep6Cd;
    this.bizStep6Nm = params.bizStep6Nm;
    this.branchCd = params.branchCd;
    this.branchTargetText = params.branchTargetText;

    this.telecomType = params.telecomType;
    this.platformType = params.platformType;
    this.serviceSupportYn = params.serviceSupportYn;
    this.launcherInstallYn = params.launcherInstallYn;
    this.serviceInvokeType = params.serviceInvokeType;
    this.phoneType = params.phoneType;
    this.reqDttm = params.reqDttm;
  }
};