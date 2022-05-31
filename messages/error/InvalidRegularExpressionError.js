const CustomError = require('./CustomError');

module.exports = class InvalidRegularExpressionError extends CustomError {
  constructor(regex) {
    super();

    this.message = `Invalid regular expression : ${regex}`;
  }
};