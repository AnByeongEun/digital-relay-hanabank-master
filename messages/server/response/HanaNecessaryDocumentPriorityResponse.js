module.exports = class HanaNecessaryDocumentPriorityResponse {
  constructor(response) {
    this.priGroupCd = response.priGroupCd;
    this.priStepCd = response.priStepCd;
    this.priStepNm = response.priStepNm;
    this.priStepOd = response.priStepOd;
  }
};