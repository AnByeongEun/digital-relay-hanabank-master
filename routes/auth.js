const express = require('express');
const router = express.Router();

const AuthService = new (require('../services/auth.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

/**
 * 토큰 발행 (ani, channelKey, contactKey)
 */
router.post('/token', ApiAction(async (req, res, next) => {
  const { ani, channelKey, contactKey } = req.body;

  const result = await AuthService.issueToken(ani, channelKey, contactKey);
  res.json(result);
}));

/**
 * 토큰 재발행 (refreshToken)
 */
router.post('/token/refresh', ApiAction(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  const result = await AuthService.refreshToken(refreshToken);
  res.json(result);
}));

module.exports = router;