const CustomError = require('./CustomError');

module.exports = class ConnectionRefusedError extends CustomError {
  constructor(message) {
    super();
    this.message = message;
  }
};