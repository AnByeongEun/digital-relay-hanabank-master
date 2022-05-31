const ErrorResponse = require('../server/common/ErrorResponse');

// TODO: 임시, 응답이 뭔가 바꼈다? (확인 후 수정 필요)
module.exports = class JourneyResponseContactKey {
  constructor(response) {
    this.status = response.status;
    // TODO: response.data 없을수도 있음?
    this.data = response.data || { result: 'success' }; // TODO: data 없는 경우 기본 데이터
    this.code = '0000';
    this.message = 'success';
  }

  isSuccess() {
    return this.code === '0000';
  }

  getErrorResponse() {
    return new ErrorResponse(this.code, this.message, this.data);
  }
};