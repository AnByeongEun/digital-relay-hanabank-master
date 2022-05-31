const jwt = require('jsonwebtoken');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = {
  sign(payload) {
    return {
      // TODO: payload 암호화 필요시 추가
      accessToken: jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_AT_EXPIRE_TIME, // vercel/ms 기준을 따름 https://github.com/vercel/ms
        algorithm: 'HS256', // TODO: 대칭 알고리즘(RS256 or ES256) 필요?
        subject: 'AT',
        // notBefore: ? // startTime
        // issuer: issuer,
      }),
      refreshToken: jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_RT_EXPIRE_TIME, // vercel/ms 기준을 따름 https://github.com/vercel/ms
        algorithm: 'HS256',
        subject: 'AT',
      }),
    };
  },
  verify(token) {
    try {
      if (!token) {
        throw new messages.error.JwtEmptyError();
      }
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        logger.warn('expired token');
        throw new messages.error.JwtExpiredError();
      } else if (err.name === 'JsonWebTokenError') {
        logger.warn('invalid token');
        throw new messages.error.JwtInvalidError();
      } else {
        logger.warn('invalid token');
        throw new messages.error.JwtInvalidError(err.message);
      }
    }
  },
  expireTime(token) {
    return this.verify(token).exp * 1000;
  },
};