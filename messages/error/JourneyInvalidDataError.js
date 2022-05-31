const CustomError = require('./CustomError');

module.exports = class JourneyInvalidDataError extends CustomError {
  constructor(response) {
    super();

    this.resCode = response.resCode;
    this.resMsg = `Journey(0030) : ${response.resMsg}`;
    this.data = response.data;
    this.resDttm = response.resDttm;
  }
};