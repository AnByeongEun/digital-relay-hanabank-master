const axios = require('axios');

const interfaceTrace = require(global._resolve('/modules/winston')).interfaceTrace;

const messages = require('../messages');
const utils = require(global._resolve('/common/utils'));

module.exports = class HttpClient {
  constructor(name) {
    this.name = name;

    const instance = axios.create({
      timeout: process.env.HTTP_TIMEOUT,
    });

    instance.interceptors.request.use(config => {
      // config.baseURL = process.env.BASE_URL; // target이 달라질 수 있으므로 사용하지 않음
      config.headers['Content-Type'] = 'text/plain; charset=EUC-KR;';
      const url = new URL(config.url);
      config._metadata = {
        url,
        startTime: new Date().getTime(),
        transactionId: utils.generateRandomString(8).toUpperCase(), // TODO: api trace의 transactionId 사용하도록 수정?
        encoding: 'text/plain; charset="euc-kr',
      };
      this.reqInterfaceTrace(config);
      return config;
    }, error => {
      console.error(error);
      return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(response => {
      this.resInterfaceTrace(response);
      return response;
    }, function (error) {
      if (error.message.indexOf('ECONNREFUSED') >= 0 || error.code === 'ENOTFOUND') {
        return Promise.reject(new messages.error.ConnectionRefusedError(error.message));
      }
      if (error.message.indexOf('timeout') >= 0 && error.code.indexOf('ECONNABORTED') >= 0) {
        return Promise.reject(new messages.error.ConnectionTimeoutError(error.message));
      }

      return Promise.reject(error);
    });

    this.instance = instance;
  }

  reqInterfaceTrace(config) {
    const { transactionId, url: { hostname, pathname } } = config._metadata;
    const message = `${config.method.toUpperCase()} ${pathname}`;
    interfaceTrace.req(this.name.toUpperCase(), 'HTTP', hostname, transactionId, message);
  }

  resInterfaceTrace(response) {
    const { method, _metadata: { startTime, transactionId, url: { hostname, pathname } } } = response.config;
    const message = `${method.toUpperCase()} ${pathname}`;
    const elapsed = new Date().getTime() - startTime;
    interfaceTrace.res(this.name.toUpperCase(), 'HTTP', hostname, transactionId, message, elapsed, response.status);
  }
};