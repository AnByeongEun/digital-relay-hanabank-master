const CommonCallgate = require('./CommonCallgate');

module.exports = class CommonDMS extends CommonCallgate {
  constructor() {
    super();
    // DMS specific
    this.contentCode = process.env.CALLGATE_CONTENT_CODE;
    this.serviceCode = `${process.env.CALLGATE_DMS_SVC_CODE}`;
  }
};