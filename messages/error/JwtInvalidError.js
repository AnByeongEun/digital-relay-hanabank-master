const CustomError = require('./CustomError');

module.exports = class JwtInvalidError extends CustomError {
  constructor(message) {
    super();

    this.message = message || 'Token is Invalid';
  }
};