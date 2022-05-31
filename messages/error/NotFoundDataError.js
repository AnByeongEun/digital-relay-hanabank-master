const CustomError = require('./CustomError');

module.exports = class NotFoundDataError extends CustomError {
  constructor(entityName) {
    super();

    this.message = `Not Found Data : ${entityName}`;
  }
};