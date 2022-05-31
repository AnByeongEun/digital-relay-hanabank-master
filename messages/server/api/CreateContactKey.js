module.exports = class CreateContactKey {
  constructor(params) {
    this.channelType = params.channelType;
    this.channelKey = params.channelKey;
    this.ani = params.ani;

    delete params.channelType;
    delete params.channelKey;
    delete params.ani;

    this.attributes = params;
  }
};