const CommonDMS = require('./common/CommonDMS');

/**
 * EDL Valid : EDL 서비스 유효성 확인 응답
 */
module.exports = class DMS1000S extends CommonDMS {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);
    response.contents.serviceInvokeType = body.substring(86, 88).trim(); // 2, V: 자동 팝업 발신, S: Redirect URL SMS 발신, L: Direct URL SMS 발신, D/N: 처리 실패

    return response;
  }
};