const express = require('express');
const router = express.Router();

const StatService = new (require('../services/stat.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

const messages = require('../messages');
const HanabizService = require('../services/hanabiz.services');

router.post('/link/talk/sendLink', ApiAction(async (req, res, next) => {
  const result = await HanabizService.sendLinkTalk(req.body);
  res.json(result);
}));
router.post('/link/sms/sendLink', ApiAction(async (req, res, next) => {
  const result = await HanabizService.sendLinkSms(req.body);
  res.json(result);
}));
router.post('/link/info', ApiAction(async (req, res, next) => {
  const linkKey = req.query.linkKey;
  const chType = req.query.chType;
  const reqDttm = req.query.reqDttm;
  const result = await HanabizService.LinkShareInfo(linkKey, chType, reqDttm);
  res.json(result);
}));
router.post('/biz/priList', ApiAction(async (req, res, next) => {
  const chType = req.query.chType;
  const reqDttm = req.query.reqDttm;
  const result = await HanabizService.getNecessaryDocumentList(chType, reqDttm);
  res.json(result);
}));
router.post('/biz/allList', ApiAction(async (req, res, next) => {
  const groupCd = req.body.groupCd;
  const result = await HanabizService.getNecessaryDocumentList(groupCd);
  res.json(result);
}));
router.post('/config/biz/priority', ApiAction(async (req, res, next) => {
  const result = await HanabizService.createNecessaryDocumentPriority(req.body);
  res.json(result);
}));
router.post('/migration/manual', ApiAction(async (req, res, next) => {
  const result = await HanabizService.migrateDatabaseManually();
  res.json(result);
}));

module.exports = router;