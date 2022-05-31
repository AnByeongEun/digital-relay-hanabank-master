const Prometheus = require('prom-client');

const logger = require(global._resolve('/modules/winston')).logger;

// TODO: 실제 Request, Response를 다루는 함수들, 어떻게 다뤄야 할지 결정

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_microseconds',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['client', 'host', 'method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500], // buckets for response time from 0.1ms to 500ms
});

module.exports = (req, res) => {
  logger.debug('>>> Log prometheus'); // TODO: 설정 확인 후 삭제
  const responseTimeInMs = Date.now() - res.locals.startEpoch;
  httpRequestDurationMicroseconds
    .labels(req.ip, req.hostname, req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs);
};
