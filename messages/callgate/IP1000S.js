const CommonIP = require('./common/CommonIP');

/**
 * EDL Valid : EDL 서비스 유효성 확인 응답
 */
module.exports = class IP1000S extends CommonIP {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);
    response.contents.telecomType = body.substring(86, 87).trim(); // 1, S, K, L
    response.contents.platformType = body.substring(87, 97).trim(); // 10, Android, iOS, N: 확인불가
    response.contents.serviceSupportYn = body.substring(97, 98).trim(); // 1, 서비스 가능 여부
    response.contents.lvmInstallYn = body.substring(98, 99); // LVM(런처) 보유 여부, Y: 보유, N: 미보유
    response.contents.serviceInvokeType = body.substring(99, 101).trim(); // 2, AS: 안드로이드 자동팝업 지원, IP: 아이폰 자동팝업 지원, SL: URL SMS 지원, N: 미지원

    return response;
  }
};