module.exports = class NecessaryDocumentPriorityResponse {
  constructor(response) {
    this.confType = response.confType;
    this.priGroupCd = response.priGroupCd;
    this.priStepCd = response.priStepCd;
    this.priStepNm = response.priStepNm;
    this.priStepOd = response.priStepOd;
  }
};