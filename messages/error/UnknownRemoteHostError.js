const CustomError = require('./CustomError');

module.exports = class UnknownRemoteHostError extends CustomError {
  constructor(hostip) {
    super();

    this.message = `Unknown Remote Host : ${hostip}`;
  }
};