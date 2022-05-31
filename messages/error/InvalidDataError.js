const CustomError = require('./CustomError');

module.exports = class InvalidDataError extends CustomError {
  constructor(message) {
    super();

    this.message = `Invalid Data : ${message}`;
  }
};