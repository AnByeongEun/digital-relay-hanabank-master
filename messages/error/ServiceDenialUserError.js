const CustomError = require('./CustomError');

module.exports = class ServiceDenialUserError extends CustomError {
  constructor() {
    super();

    this.message = 'Service Denial User';
  }
};