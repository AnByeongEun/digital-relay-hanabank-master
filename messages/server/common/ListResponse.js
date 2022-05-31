module.exports = class ListResponse {
  constructor(result) {
    this.contents = result;
    this.totalCount = result.length;
  }
};