const CommonHanabank = require('./common/CommonHanabank');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class BranchDataQ extends CommonHanabank {
  // messageType : BranchData
  constructor(param) {
    super();
    // TODO: 영업점기본정보조회[SCCC9250A001] 입력 전문 데이터부 정의 필요
    //   BR_NO(4) : 점번호
    //   BR_SEQ_NO(1) : 점일련번호
    //   COM_CAN_TRSC_DV_CD(1) : 공통취소거래구분코드 [9]
    //   HANA_FNC_HLDGS_GRCO_CD(2) : 하나금융지주그룹사코드 [01]
    //   INQ_BASC_ST_CD(1) : 조회기준상태코드 [9]

    if (process.env.ADD_STD_TMSG_SEQ_NO == '99999') {
      process.env.ADD_STD_TMSG_SEQ_NO = '1';
    } else {
      process.env.ADD_STD_TMSG_SEQ_NO = parseInt(process.env.ADD_STD_TMSG_SEQ_NO) + 1;
    }

    this.messageType = this.constructor.name;
    this.messageCode = 'SCCC9250A001';

    this.BR_NO = param.brNo;
    this.BR_SEQ_NO = param.brSeqNo;
    this.COM_CAN_TRSC_DV_CD = param.comCanTrscDvCd;
    this.HANA_FNC_HLDGS_GRCO_CD = param.hanaFncHldgsGrcoCd;
    this.INQ_BASC_ST_CD = param.inqBascStCd;
    this.GOALBANG2 = '@@';
  }

  makeRequestBody() {
    const body = paddingByteLen(this.BR_NO, 4)
     + paddingByteLen(this.BR_SEQ_NO, 1)
     + paddingByteLen(this.COM_CAN_TRSC_DV_CD, 1)
     + paddingByteLen(this.HANA_FNC_HLDGS_GRCO_CD, 2)
     + paddingByteLen(this.INQ_BASC_ST_CD, 1)
     + paddingByteLen(this.GOALBANG2, 2);
    return body;
  }

  printRequestMessageLog() {
    const messageLog = `${this.getHeaderLog()}

    [데이터 부]
    =====================================================================
    [${this.descPad('점번호')}][${this.namePad('BR_NO')}][${this.numPad(4)}][${this.BR_NO.padding(4)}]
    [${this.descPad('점일련번호')}][${this.namePad('BR_SEQ_NO')}][${this.numPad(1)}][${this.BR_SEQ_NO.padding(1)}]
    [${this.descPad('공통취소거래구분코드')}][${this.namePad('COM_CAN_TRSC_DV_CD')}][${this.numPad(1)}][${this.COM_CAN_TRSC_DV_CD.padding(1)}]
    [${this.descPad('하나금융지주그룹사코드')}][${this.namePad('HANA_FNC_HLDGS_GRCO_CD')}][${this.numPad(2)}][${this.HANA_FNC_HLDGS_GRCO_CD.padding(2)}]
    [${this.descPad('조회기준상태코드')}][${this.namePad('INQ_BASC_ST_CD')}][${this.numPad(1)}][${this.INQ_BASC_ST_CD.padding(1)}]
    `;

    logger.info(messageLog);
  }
};

function paddingByteLen(str, maxbyte) {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }
  return str.padding(maxbyte);
}
