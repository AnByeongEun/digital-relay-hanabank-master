const ContactAttributeResponse = require('./ContactAttributeResponse');

module.exports = class ContactResponse {
  constructor(response) {
    this.id = response.id;
    this.key = response.key;
    this.channelKey = response.channelKey;
    this.ani = response.ani;
    this.contactAttributes = response.ContactAttributes.map(c => new ContactAttributeResponse(c));
  }
};