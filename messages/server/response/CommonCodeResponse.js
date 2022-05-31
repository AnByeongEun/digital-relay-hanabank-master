module.exports = class CommonCodeResponse {
  constructor(response) {
    this.id = response.id;
    this.codeGroup = response.codeGroup;
    this.codeGroupName = response.codeGroupName;
    this.code = response.code;
    this.value = response.value;
    this.codeOrder = response.codeOrder;
    this.isActive = response.isActive;
  }
};