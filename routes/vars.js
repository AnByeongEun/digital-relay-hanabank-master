const express = require('express');
const router = express.Router();

const VisualArsService = new (require('../services/vars.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

const Prometheus = require('prom-client');

router.get('/metrics', function(req, res) {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

/**
 * Callgate Voice-Data Link Check (VDL0000Q)
 */
router.post('/vdl/check', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.vdlCheck(req.body);
  res.json(result);
}));

/**
 * Callgate Voice-Data Link Inquiry (VDL1000Q)
 */
router.post('/vdl/inquiry', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.vdlInquiry(req.body);
  res.json(result);
}));

/**
 * Callgate Voice-Data Link Invoke (VDL2000Q)
 */
router.post('/vdl/invoke', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.vdlInvoke(req.body);
  res.json(result);
}));

/**
 * Callgate EDL Valid (EDL0000Q)
 */
router.post('/edl/valid', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.edlValid(req.body);
  res.json(result);
}));

/**
 * Callgate EDL Check (EDL1000Q)
 */
router.post('/edl/check', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.edlCheck(req.body);
  res.json(result);
}));

/**
 * Callgate EDL Wakeup (EDL2000Q)
 */
router.post('/edl/wakeup', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.edlWakeup(req.body);
  res.json(result);
}));

/**
 * Callgate EDL Send (EDL3000Q)
 */
router.post('/edl/send', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.edlSend(req.body);
  res.json(result);
}));

/**
 * Callgate Direct Messaging Service Send (DMS1000Q)
 */
router.post('/dms/send', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.dmsSend(req.body);
  res.json(result);
}));

/**
 * Callgate Direct Messaging Service Send Dynamic (DMS1001Q)
 */
router.post('/dms/send/dynamic', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.dmsSendDynamic(req.body);
  res.json(result);
}));

/**
 * Callgate Info Push Send (IP1000Q)
 */
router.post('/infopush/send', ApiAction(async (req, res, next) => {
  const result = await VisualArsService.infopushSend(req.body);
  res.json(result);
}));

module.exports = router;