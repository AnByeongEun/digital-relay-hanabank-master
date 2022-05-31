module.exports = class NecessaryDocumentResponse {
  constructor(response) {
    this.haiSvcGrpCd = response.haiSvcGrpCd;
    this.ncsyDcmtDvCd = response.ncsyDcmtDvCd;
    this.bizSeqNo = response.bizSeqNo;
    this.step1Cd = response.step1Cd;
    this.step1Nm = response.step1Nm;
    this.step2Cd = response.step2Cd;
    this.step2Nm = response.step2Nm;
    this.step3Cd = response.step3Cd;
    this.step3Nm = response.step3Nm;
    this.step4Cd = response.step4Cd;
    this.step4Nm = response.step4Nm;
    this.step5Cd = response.step5Cd;
    this.step5Nm = response.step5Nm;
    this.step6Cd = response.step6Cd;
    this.step6Nm = response.step6Nm;
    this.ncsyDcmts = response.ncsyDcmts ? JSON.parse(response.ncsyDcmts) : response.ncsyDcmts;
    this.gudSntcCtts = response.gudSntcCtts ? JSON.parse(response.gudSntcCtts) : response.gudSntcCtts;
    this.addDcmtCtt = response.addDcmtCtt ? JSON.parse(response.addDcmtCtt) : response.addDcmtCtt;
    this.ncsyDcmtGudCtt = response.ncsyDcmtGudCtt ? JSON.parse(response.ncsyDcmtGudCtt) : response.ncsyDcmtGudCtt;
  }
};