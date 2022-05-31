module.exports = class TokenResponse {
  constructor(token) {
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
  }
};