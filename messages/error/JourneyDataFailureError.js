const CustomError = require('./CustomError');

module.exports = class JourneyDataFailureError extends CustomError {
  constructor(response) {
    super();

    this.resCode = response.resCode;
    this.resMsg = `Journey(0050) : ${response.resMsg}`;
    this.data = response.data;
    this.resDttm = response.resDttm;
  }
};