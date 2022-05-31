const CustomError = require('./CustomError');

module.exports = class DatabaseError extends CustomError {
  constructor(error) {
    super();

    // TODO: 수정
    this.status = error.status || 400;
    this.code = error.code || 999;
    this.message = error.message || '';
  }
};