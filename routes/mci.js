const express = require('express');
const router = express.Router();

const MciService = new (require('../services/mci.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

const Prometheus = require('prom-client');

const messages = require('../messages');

router.get('/metrics', function(req, res) {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

/* =================================================================================================== */

/**
 * 우체국 전화번호 전자금융약정 조회
 */
router.post('/channel', ApiAction(async (req, res, next) => {
  const result = await MciService.getElectronicFinanceContract(req.body);
  res.json(result);
}));

module.exports = router;