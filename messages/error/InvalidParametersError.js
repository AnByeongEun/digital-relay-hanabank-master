const CustomError = require('./CustomError');

module.exports = class InvalidParametersError extends CustomError {
  constructor(message) {
    super();

    this.message = message;
  }
};