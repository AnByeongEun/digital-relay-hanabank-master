const CustomError = require('./CustomError');

module.exports = class JourneyElasticsearchConnectionError extends CustomError {
  constructor(response) {
    super();

    this.resCode = response.resCode;
    this.resMsg = `Journey(0090) : ${response.resMsg}`;
    this.data = response.data;
    this.resDttm = response.resDttm;
  }
};