module.exports = class CreateAccessToken {
  constructor(ani, contactKey, webKey, accessToken) {
    this.ani = ani;
    this.contactKey = contactKey;
    this.webKey = webKey;
    this.accessToken = accessToken;
  }

  getDeleteTokenParams() {
    return {
      ani: this.ani,
      accessToken: this.accessToken,
    };
  }
};