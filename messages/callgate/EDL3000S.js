const CommonEDL = require('./common/CommonEDL');

/**
 * EDL Send : EDL 컨텐츠 전송 응답
 */
module.exports = class EDL3000S extends CommonEDL {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);
    response.contents.serviceSupportYn = body.substring(86, 87).trim(); // 1, resultCode가 0000이 아닌 경우 의미 없음
    response.contents.platformType = body.substring(87, 88).trim(); // 1, A: Android, I: iOS, E: Etc, N: 확인불가

    return response;
  }
};