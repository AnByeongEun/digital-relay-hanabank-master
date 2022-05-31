module.exports = class HanaNecessaryDocumentResponse {
  constructor(response) {
    this.ncsyDcmtDvCd = response.ncsyDcmtDvCd;
    this.bizSeqNo = response.bizSeqNo;
    this.step1Cd = response.step1Cd;
    this.step2Cd = response.step2Cd;
    this.step3Cd = response.step3Cd;
    this.step4Cd = response.step4Cd;
    this.step5Cd = response.step5Cd;
    this.step6Cd = response.step6Cd;
    this.step1Nm = response.step1Nm;
    this.step2Nm = response.step2Nm;
    this.step3Nm = response.step3Nm;
    this.step4Nm = response.step4Nm;
    this.step5Nm = response.step5Nm;
    this.step6Nm = response.step6Nm;
    this.ncsyDcmts = response.ncsyDcmts;
    this.gudSntcCttsAll = response.gudSntcCttsAll;
    this.gudSntcCttsN = response.gudSntcCttsN;
    this.addDcmtCtt = response.addDcmtCtt;
    this.ncsyDcmtGudCtt = response.ncsyDcmtGudCtt;
  }
};