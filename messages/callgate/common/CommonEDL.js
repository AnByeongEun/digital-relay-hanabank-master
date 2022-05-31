const CommonCallgate = require('./CommonCallgate');

module.exports = class CommonEDL extends CommonCallgate {
  constructor() {
    super();
    // EDL specific
    this.serviceCode = `${process.env.CALLGATE_EDL_SVC_CODE}`;
  }
};