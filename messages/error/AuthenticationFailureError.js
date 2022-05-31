const CustomError = require('./CustomError');

module.exports = class AuthenticationFailureError extends CustomError {
  constructor(reason) {
    super();

    this.message = `Authentication is Failure${reason ? ` : ${reason}` : ''}`;
  }
};