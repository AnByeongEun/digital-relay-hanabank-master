const CommonCallgate = require('./CommonCallgate');

module.exports = class CommonVDL extends CommonCallgate {
  constructor() {
    super();
    // VDL specific
    this.contentCode = process.env.CALLGATE_CONTENT_CODE;
    this.serviceCode = `${process.env.CALLGATE_VDL_SVC_CODE}`;
  }
};