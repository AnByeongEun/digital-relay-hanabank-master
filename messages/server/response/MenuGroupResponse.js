module.exports = class MenuGroupResponse {
  constructor(response) {
    this.id = response.id;
    this.name = response.name;
    this.description = response.description;
  }
};