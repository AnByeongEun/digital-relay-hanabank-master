const prometheusLogging = require('../../routes/common/prometheus');
const utils = require(global._resolve('/common/utils'));
const config = require(global._configPath);

const apiTrace = require(global._resolve('/modules/winston')).apiTrace;
const logger = require(global._resolve('/modules/winston')).logger;

const reqApiTrace = (transactionId, req) => {
  const resourceName = req.baseUrl.replace('/', '').toUpperCase();
  const message = `${req.method} ${req.originalUrl}`;
  apiTrace.req(transactionId, 'HTTP', resourceName, message);
};

const resApiTrace = (transactionId, req, res) => {
  const resourceName = req.url.split('/')[1].toUpperCase();
  const message = `${req.method} ${req.originalUrl}`;
  const elapsed = new Date().getTime() - req._startTime;
  apiTrace.res(transactionId, 'HTTP', resourceName, message, elapsed, res.statusCode);
};

const checkOptionMethod = (req, res) => {
  if (req.method === 'OPTIONS') {
    logger.error('checkOptionMethod 이 로그는 찍히면 안됩니다'); // TODO: ivr에서 넘어오는 request의 OPTIONS method가 cors 모듈 통과할때가 있다고 함, 확인
    const allowOrigin = global._env === 'production' ? (config.allowedHttpOrigins.indexOf(req.headers.origin) > -1 ? req.headers.origin : 'null') : '*';
    const header = {
      'access-control-allow-origin': allowOrigin,
      'access-control-allow-methods': 'GET, POST  PUT, DELETE, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': 10,
    };

    if (global._env === 'production') {
      header.push([{
        key: 'Vary',
        value: 'Origin',
      }]);
    }
    res.writeHead(204, header);
    res.end();
  } else {
    // next();
  }
};

// api의 중복된 부분을 wrapping 하는 함수들 정의 (인증 등 기능 필요시 wrapper 추가)

module.exports = {
  ApiAction(fn) {
  // 모든 오류를 .catch() 처리하고 체인의 next() 미들웨어에 전달
    return (req, res, next) => {
      const transactionId = utils.generateRandomString(8).toUpperCase();
      reqApiTrace(transactionId, req);
      checkOptionMethod(req);

      fn(req, res, next).catch(next);

      res.on('finish', () => {
        prometheusLogging(req, res);
        resApiTrace(transactionId, req, res);
      });
    };
  },
};