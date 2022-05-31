const CommonVDL = require('./common/CommonVDL');
const AES256 = require('../../routes/middlewares/AES256');

module.exports = class VDL1000Q extends CommonVDL {
  constructor({ ani }) {
    super();
    this.messageType = this.constructor.name;
    this.userMdn = ani || '';
  }

  makeRequestBody(messageType) {
    const rawBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16);

    const rawLogBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + AES256.encrypt(this.userMdn.padding(16).trim());
    return this.encryptBody(this.key, rawBody, rawLogBody);
  }
};