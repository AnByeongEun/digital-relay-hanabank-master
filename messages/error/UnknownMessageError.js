const CustomError = require('./CustomError');

module.exports = class UnknownMessageError extends CustomError {
  constructor(messageName) {
    super();

    this.message = `Unknown Message Name : ${messageName}`;
  }
};