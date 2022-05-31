module.exports = class HanaNecessaryDocumentPriorityResponse {
  constructor(response) {
    this.CONF_KEY = response.CONF_KEY;
    this.CONF_TYPE = response.CONF_TYPE;

    this.START_DATE = response.START_DATE;
    this.END_DATE = response.END_DATE;

    this.UPDATE_USER = response.UPDATE_USER;
    this.UPDATE_TIME = response.UPDATE_TIME;

    this.CH_TYPE = response.CH_TYPE;
    this.VIEWCHECK = response.VIEWCHECK;
  }
};