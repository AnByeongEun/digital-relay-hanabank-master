const express = require('express');
const router = express.Router();

const StatService = new (require('../services/stat.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

const messages = require('../messages');

/**
 * 고객 접근 이력 저장 요청 (IVR)
 */
router.post('/contact/ivr', ApiAction(async (req, res, next) => {
  const message = new messages.server.api.StatContactIVR(req.body);
  const result = await StatService.saveContactStats(message);
  res.json(result);
}));

/**
 * Thru 이력 저장 요청
 */
router.post('/view', ApiAction(async (req, res, next) => {
  const message = new messages.server.api.StatContactView(req.body);
  const result = await StatService.saveViewStats(message);
  res.json(result);
}));

/**
 * 필요서류 이력 저장 요청
 */
router.post('/biz', ApiAction(async (req, res, next) => {
  const result = await StatService.saveNecessaryDocument(req.body);
  res.json(result);
}));

/**
 * 영업점 이력 저장 요청
 */
router.post('/branch', ApiAction(async (req, res, next) => {
  const result = await StatService.saveBranch(req.body);
  res.json(result);
}));

module.exports = router;