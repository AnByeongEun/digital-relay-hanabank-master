const CommonVDL = require('./common/CommonVDL');

module.exports = class VDL2000S extends CommonVDL {
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