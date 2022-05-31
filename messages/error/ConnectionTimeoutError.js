const CustomError = require('./CustomError');

module.exports = class ConnectionTimeoutError extends CustomError {
  constructor(message) {
    super();
    this.message = message;
  }
};