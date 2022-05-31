const express = require('express');
const router = express.Router();

const logger = require(global._resolve('/modules/winston')).logger;

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express Nodejs Server' });
  res.send({ title: 'Digital Relay 2.0 !!' });
});

// Runs before each requests
router.use(function(req, res, next) {
  res.locals.startEpoch = Date.now();
  next();
});

const url = require('url');
const urlencode = require('urlencode');

// const makeRedirectGetUrl = (req, path) => {
//   return urlencode.decode(url.format({
//     pathname: path,
//     query: req.query,
//   }));
// };

// 사이트별로 경로 다르게 지정할 경우 아래 방식 고려
router.get('/redirect', (req, res, next) => {
  res.redirect(req.url.replace(req.path, '/view/menus'));
});

// const getReqFrom = req => {
//   return req.get('reqFrom') || null;
// };

// const requestReqParams = (req, isData) => {
//   let reqParams = null;

//   if (req.method === 'GET') {
//     reqParams = req.query;
//   } else {
//     // POST PUT DELETE
//     // TODO: 왜 이렇게 body를 다르게
//     reqParams = isData ? req.body.data : req.body; // 확인 후 수정

//     if (getReqFrom(req) === 'web') {
//       return JSON.parse(reqParams);
//     }
//   }

//   logger.debug(`method [${req.method}] reqParams : ${JSON.stringify(reqParams)}`);
//   return reqParams;
// };

// request body, headers, url data를 하나의 객체로 변환
// TODO: 모든 route에 공통으로 적용 되도록 app.js로 이동, 더 좋은 방법 있으면 수정
// 서비스쪽으로 전달되는 parameters는 controller에서 정의해서 전달하도록 한다.
// 수정하더라도 일단 개발할동안은 놔둠
// router.use((req, res, next) => {
//   req.data = {
//     params: requestReqParams(req, false), // TODO: data 로 감싸서 넣는 부분 수정 필요
//     headers: req.headers,
//     reqObject: getParamListFromRequest(req),
//   };
//   next();
// });

module.exports = router;
