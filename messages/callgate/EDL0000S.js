const CommonEDL = require('./common/CommonEDL');

/**
 * EDL Valid : EDL 서비스 유효성 확인 응답
 */
module.exports = class EDL0000S extends CommonEDL {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);

    return response;
  }
};