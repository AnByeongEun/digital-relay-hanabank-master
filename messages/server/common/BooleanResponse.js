module.exports = class BooleanResponse {
  constructor(result) {
    this.result = !!result;
  }
};