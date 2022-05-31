const CustomError = require('./CustomError');

module.exports = class JwtExpiredError extends CustomError {
  constructor() {
    super();

    this.message = 'Token is Expired';
  }
};