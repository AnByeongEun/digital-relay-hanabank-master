const moment = require('moment');

module.exports = class ErrorResponse {
  constructor(code, message, data, resDttm = '') {
    this.code = code;
    this.message = message;
    this.data = data;

    const currentTime = moment().format('YYYYMMDDHHmmssSSS');

    // this.resCode = response.data.resCode;
    // this.resMsg = response.data.resMsg;
    // this.data = response.data.data; // TODO: data 없는 경우 기본 데이터
    this.resDttm = currentTime;
  }
};