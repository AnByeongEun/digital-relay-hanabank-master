const CommonHanabank = require('./common/CommonHanabank');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class SendKakaoTalkS extends CommonHanabank {
  // messageType : BranchData
  constructor(data) {
    super();
    // TODO: 카카오톡 전송[SUMSM01KA502] 출력 전문 데이터부 정의 필요
    //   ...
    this.data = data.toString();

    this.messageType = this.constructor.name;
    this.messageCode = 'SUMSM01KA502';
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);
    // 필요한 데이터만 추출해서 응답할지, 전체 응답할지
    response.contents.UMS_MSG_DV_CD = body.substr(9, 1).trim();

    this.printResponseMessageLog(response.contents);

    return response;
  }

  printResponseMessageLog(response) {
    const messageLog = `${this.getHeaderLog()}

    [데이터 부]
    =====================================================================
    [${this.descPad('UMS메시지구분코드')}][${this.namePad('UMS_MSG_DV_CD')}][${this.numPad(1)}][${response.UMS_MSG_DV_CD.padding(1)}]
    `;

    logger.info(messageLog);
  }
};