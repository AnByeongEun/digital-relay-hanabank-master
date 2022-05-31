const CommonVDL = require('./common/CommonVDL');

module.exports = class VDL0000S extends CommonVDL {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);

    return response;
  }
};