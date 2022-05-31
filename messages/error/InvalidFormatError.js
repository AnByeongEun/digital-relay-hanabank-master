const CustomError = require('./CustomError');

module.exports = class InvalidFormatError extends CustomError {
  constructor(message) {
    super();

    this.message = `Invalid Data Format : ${message}`;
  }
};