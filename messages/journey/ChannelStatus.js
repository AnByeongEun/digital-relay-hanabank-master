module.exports = class ChannelStatus {
  constructor(response) {
    this.channelType = response.data.USE_CH;
    this.systemState = response.data.SYSTEM_STATE;
    this.title = response.data.TITLE;
    this.content = response.data.CONTENT;
    this.main = response.data.MAIN; // ??
    this.elderlyCriteria = require(global._configPath).elderlyCriteria;
    this.createdAt = response.data.CREATE_AT;
    this.updatedAt = response.data.UPDATE_AT;
    this.updatedBy = response.data.UPDATE_USER;
  }
};