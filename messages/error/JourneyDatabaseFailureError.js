const CustomError = require('./CustomError');

module.exports = class JourneyDatabaseFailureError extends CustomError {
  constructor(response) {
    super();

    this.resCode = response.resCode;
    this.message = `Journey(0080) : ${response.resMsg}`;
    this.data = response.data;
    this.resDttm = response.resDttm;
  }
};