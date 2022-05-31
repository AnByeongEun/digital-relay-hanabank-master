const ErrorResponse = require('../server/common/ErrorResponse');
const moment = require('moment');

const JourneyInvalidDataError = require('../error/JourneyInvalidDataError');
const JourneyDataFailureError = require('../error/JourneyDataFailureError');
const JourneyDatabaseFailureError = require('../error/JourneyDatabaseFailureError');
const JourneyElasticsearchConnectionError = require('../error/JourneyElasticsearchConnectionError');

module.exports = class JourneyResponse {
  constructor(response) {
    const currentTime = moment().format('YYYYMMDDHHmmssSSS');
    /* Journey Response Format (data는 optional)
    {
      …
      "status": 200,
      "data": {
        "resCode": "0000",
        "resMsg": "message",
        "resDttm": "20220305111121323",
        "data": {
          "chKey: "key123"
        }
      }
    }
    */

    this.status = response.status;

    this.resCode = response.data.resCode;
    this.resMsg = response.data.resMsg;
    this.data = response.data.data;
    this.resDttm = response.data.resDttm;
    // this.resDttm = currentTime;

    this.checkError();
  }

  isSuccess() {
    return this.resCode === '0000';
  }

  checkError() {
    switch (this.resCode) {
      case '0030':
        throw new JourneyInvalidDataError(this);
      case '0050':
        throw new JourneyDataFailureError(this);
      case '0080':
        throw new JourneyDatabaseFailureError(this);
      case '0090':
        throw new JourneyElasticsearchConnectionError(this);
      default:
        // 500 error?
    }
  }

  getErrorResponse() {
    return new ErrorResponse(this.resCode, this.resMsg, this.data, this.resDttm);
  }
};