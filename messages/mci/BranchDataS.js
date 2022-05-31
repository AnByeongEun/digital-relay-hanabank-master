const CommonHanabank = require('./common/CommonHanabank');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class BranchDataS extends CommonHanabank {
  // messageType : BranchData
  constructor(data) {
    super();
    // TODO: 영업점기본정보조회[SCCC9250A001] 출력 전문 데이터부 정의 필요
    //   BR_NO(4) : 점번호
    //   BR_SEQ_NO(1) : 점일련번호
    //   BUSS_BR_RGN_HQ_CD(2) : 영업점지역본부코드
    //   ...
    this.data = data.toString();

    // this.messageType = this.constructor.name;
    // this.messageCode = 'SCCC9250A001';
  }

  makeResponseBody(body, Gid) {
    const response = this.decodeCommonResponse(body, 'B');

    let STD_TMSG_DAT_KIND_CD = cutByteLen(body, 2);
    body = body.slice(STD_TMSG_DAT_KIND_CD.length, body.length);
    let STD_TMSG_DAT_LEN = cutByteLen(body, 8);
    body = body.slice(STD_TMSG_DAT_LEN.length, body.length);

    let BR_NO = cutByteLen(body, 8);
    body = body.slice(BR_NO.length, body.length);
    let BR_SEQ_NO = cutByteLen(body, 8);
    body = body.slice(BR_SEQ_NO.length, body.length);
    let ADR_POST_INFO_CTT = cutByteLen(body, 8);
    body = body.slice(ADR_POST_INFO_CTT.length, body.length);
    let PARK_POST_INFO_CTT = cutByteLen(body, 8);
    body = body.slice(PARK_POST_INFO_CTT.length, body.length);
    let CLSE_BR_NO = cutByteLen(body, 8);
    body = body.slice(CLSE_BR_NO.length, body.length);
    let CLSE_BR_NM = cutByteLen(body, 8);
    body = body.slice(CLSE_BR_NM.length, body.length);
    let UNFY_BR_NO = cutByteLen(body, 8);
    body = body.slice(UNFY_BR_NO.length, body.length);
    let UNFY_BR_NM = cutByteLen(body, 8);
    body = body.slice(UNFY_BR_NM.length, body.length);
    let UNFY_CLSE_DT = cutByteLen(body, 8);
    body = body.slice(UNFY_CLSE_DT.length, body.length);

    response.data.GID = Gid.trim();
    response.data.brNo = BR_NO.trim();
    response.data.brSeqNo = BR_SEQ_NO.trim();
    response.data.adrPostInfoCtt = ADR_POST_INFO_CTT.trim();
    response.data.parkPostInfoCtt = PARK_POST_INFO_CTT.trim();
    response.data.clseBrNo = CLSE_BR_NO.trim();
    response.data.clseBrNo = CLSE_BR_NM.trim();
    response.data.unfyBrNo = UNFY_BR_NO.trim();
    response.data.unfyBrNm = UNFY_BR_NM.trim();
    response.data.unfyClseDt = UNFY_CLSE_DT.trim();

    // // body 기준 offset
    // response.contents.BR_NO = body.substr(0, 4).trim();
    // response.contents.BR_SEQ_NO = body.substr(4, 1).trim();
    // // ...
    // response.contents.ADR_POST_INFO_CTT = body.substr(1009, 500).trim();
    // response.contents.PARK_POST_INFO_CTT = body.substr(1512, 500).trim();
    // // 필요한 데이터만 추출해서 응답할지, 전체 응답할지
    // response.contents.CLSE_BR_NO = body.substr(5276, 4).trim();
    // response.contents.CLSE_BR_NM = body.substr(5280, 40).trim();
    // response.contents.UNFY_BR_NO = body.substr(5320, 4).trim();
    // response.contents.UNFY_BR_NM = body.substr(5324, 40).trim();

    // response.contents.UNFY_CLSE_DT = body.substr(5365, 8).trim();

    this.printResponseMessageLog(response.contents);

    return response;
  }

  printResponseMessageLog(response) {
    const messageLog = `${this.getHeaderLog()}
    =====================================================================
    [GID]${response, GID}
    =====================================================================
    [데이터 부]
    =====================================================================
    [${this.descPad('점번호')}][${this.namePad('BR_NO')}][${this.numPad(4)}][${response.BR_NO.padding(4)}]
    [${this.descPad('점일련번호')}][${this.namePad('BR_SEQ_NO')}][${this.numPad(1)}][${response.BR_SEQ_NO.padding(1)}]
    [${this.descPad('오시는길')}][${this.namePad('ADR_POST_INFO_CTT')}][${this.numPad(500)}][${response.ADR_POST_INFO_CTT.padding(500)}]
    [${this.descPad('주차정보')}][${this.namePad('PARK_POST_INFO_CTT')}][${this.numPad(500)}][${response.PARK_POST_INFO_CTT.padding(500)}]
    [${this.descPad('폐쇄점번호')}][${this.namePad('CLSE_BR_NO')}][${this.numPad(4)}][${response.CLSE_BR_NO.padding(4)}]
    [${this.descPad('폐쇄점명')}][${this.namePad('CLSE_BR_NM')}][${this.numPad(40)}][${response.CLSE_BR_NM.padding(40)}]
    [${this.descPad('통합점번호')}][${this.namePad('UNFY_BR_NO')}][${this.numPad(4)}][${response.UNFY_BR_NO.padding(4)}]
    [${this.descPad('통합점명')}][${this.namePad('UNFY_BR_NM')}][${this.numPad(40)}][${response.UNFY_BR_NM.padding(40)}]
    [${this.descPad('통합폐쇄일자')}][${this.namePad('UNFY_CLSE_DT')}][${this.numPad(8)}][${response.UNFY_CLSE_DT.padding(8)}]
    `;

    logger.info(messageLog);
  }
};

function cutByteLen(str, maxByte) {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }
  return str.substr(0, i);
}
