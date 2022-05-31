module.exports = class HanaTargetDocumentResponse {
  constructor(response) {
    this.chType = response.chType;
    this.currentStep = response.currentStep;
    this.currentCode = response.currentCode;
    this.currnetName = response.currnetName;
    this.groupCd = response.groupCd;
    this.targetStep = response.targetStep;
    this.bizStep1Cd = response.bizStep1Cd;
    this.bizStep1Nm = response.bizStep1Nm;
    this.bizStep2Cd = response.bizStep2Cd;
    this.bizStep2Nm = response.bizStep2Nm;
    this.bizStep3Cd = response.bizStep3Cd;
    this.bizStep3Nm = response.bizStep3Nm;
    this.bizStep4Cd = response.bizStep4Cd;
    this.bizStep4Nm = response.bizStep4Nm;
    this.bizStep5Cd = response.bizStep5Cd;
    this.bizStep5Nm = response.bizStep5Nm;
    this.bizStep6Cd = response.bizStep6Cd;
    this.bizStep6Nm = response.bizStep6Nm;
    this.reqDttm = response.reqDttm;
  }
};