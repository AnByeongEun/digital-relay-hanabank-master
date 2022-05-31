const CommonVDL = require('./common/CommonVDL');

module.exports = class VDL1000S extends CommonVDL {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);
    response.contents.telecomType = body.substring(86, 87).trim(); // 1, S, K, L
    response.contents.platformType = body.substring(87, 97).trim(); // 10, Android, iOS, N: 확인불가
    response.contents.serviceSupportYn = body.substring(97, 98).trim(); // 1, 서비스 가능 여부
    response.contents.launcherInstallYn = body.substring(98, 99).trim(); // 1, Callgate SDK 설치 여부
    response.contents.serviceInvokeType = body.substring(99, 101).trim(); // 2, AS: 안드로이드, IP: 아이폰, SL: SMS, N: 미지원
    response.contents.phoneType = body.substring(101, 102).trim(); // 1, F: 피처폰, S:스마트폰, N:미확인

    return response;
  }
};