const CustomError = require('./CustomError');

module.exports = class JwtEmptyError extends CustomError {
  constructor() {
    super();

    this.message = 'Token is Empty';
  }
};