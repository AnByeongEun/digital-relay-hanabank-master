const CommonCallgate = require('./CommonCallgate');

module.exports = class CommonIP extends CommonCallgate {
  constructor() {
    super();
    // Info Push specific
    this.prologueContentCode = process.env.CALLGATE_PROLOGUE_CONTENT_CODE;
    this.epilogueContentCode = process.env.CALLGATE_EPILOGUE_CONTENT_CODE;
    this.serviceCode = `${process.env.CALLGATE_IP_SVC_CODE}`;
  }
};