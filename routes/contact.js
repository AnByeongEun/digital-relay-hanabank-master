const express = require('express');
const router = express.Router();

const ContactService = new (require('../services/contact.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

const Prometheus = require('prom-client');

const messages = require('../messages');

router.get('/metrics', function(req, res) {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

/* =================================================================================================== */

router.get('/testapi', ApiAction(async (req, res, next) => {
  const mci = require('../api/mci.api');
  const result = await mci.getBranch({ BR_NO: '1234', BR_SEQ_NO: '0' });
  // const result = await ContactService.testapi(req.body);
  res.json(result);
}));

/**
 * 채널 시스템 정보 조회
 */
router.get('/channel', ApiAction(async (req, res, next) => {
  const channelType = req.query.channelType;
  const result = await ContactService.channelStatus(channelType);
  res.json(result);
}));

/**
 * 컨택 키 발행 요청
 * TODO: validation, db 조회해서 검사하도록 수정
 */
router.post('/key', ApiAction(async (req, res, next) => {
  // 채널 유형별로 validation 요건 달라짐. DB 영역이므로 코드상으로는 따로 처리할 것 없음
  const message = new messages.server.api.CreateContactKey(req.body);
  const result = await ContactService.createContactKey(message);
  res.json(result);
}));

/**
 * 고객 접근 정보 조회
 * TODO: tb_gateway_request 통해 body param validation 필요
 */
router.get('/', ApiAction(async (req, res, next) => {
  const channelKey = req.query.channelKey;

  const result = await ContactService.contactStatus(channelKey);
  res.json(result);
}));

/**
 * 링크 키 발행 요청
 * TODO: validation, db 조회해서 검사하도록 수정
 */
router.post('/linkkey', ApiAction(async (req, res, next) => {
  const message = new messages.server.api.CreateLinkKey(req.body);
  const result = await ContactService.createLinkKey(message);
  res.json(result);
}));

/**
 * 컨택/링크 키 통합 발행 요청
 * TODO: validation, db 조회해서 검사하도록 수정
 */
router.post('/linkkey/combined', ApiAction(async (req, res, next) => {
  const message = new messages.server.api.CreateLinkAndContactKey(req.body);
  const result = await ContactService.issueLinkAndContactKey(message);
  res.json(result);
}));

/**
 * 고객 접근 정보 콜 상태 수정
 * IVR CallKey를 통해 현재 콜 상태 조회
 */
router.post('/status', ApiAction(async (req, res, next) => {
  const { channelKey, status } = req.body;
  const result = await ContactService.updateCallStatus(channelKey, status);
  res.json(result);
}));

/**
 * IVR 콜 상태 조회
 * IVR CallKey를 통해 현재 콜 상태 조회
 */
router.get('/status', ApiAction(async (req, res, next) => {
  const channelKey = req.query.channelKey;
  const result = await ContactService.callStatus(channelKey);
  res.json(result);
}));

module.exports = router;