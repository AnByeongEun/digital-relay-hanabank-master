module.exports = class ContactAttributeResponse {
  constructor(response) {
    this.id = response.id;
    this.name = response.name;
    this.value = response.value;
  }
};