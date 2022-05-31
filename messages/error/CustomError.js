const ErrorResponse = require('../server/common/ErrorResponse');

const E = (status, code) => { return { status, code }; };

const ErrorType = {
  // BAD_REQUEST
  NotFoundData: E(400, 111),
  InvalidParameters: E(400, 123),
  InvalidData: E(400, 126),
  InvalidRegularExpression: E(400, 127),
  ServiceDenialUser: E(400, 142),
  UnknownMessage: E(400, 171),
  InvalidFormat: E(400, 181),
  ConnectionRefused: E(400, 501),
  ConnectionTimeout: E(400, 502),
  JourneyInvalidData: E(400, 701),
  JourneyDataFailure: E(400, 702),
  JourneyDatabaseError: E(400, 703),
  JourneyElasticsearchConnection: E(400, 704),
  // UNAUTHORIZED
  AuthenticationFailure: E(401, 101),
  UnknownRemoteHost: E(401, 104),
  JwtEmpty: E(401, 107),
  JwtInvalid: E(401, 108),
  JwtExpired: E(401, 109),
};

module.exports = class CustomError extends Error {
  constructor() {
    super();

    this.status = this.getStatusCode().status;
    this.code = this.getStatusCode().code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  getResponse() {
    return new ErrorResponse(this.code || 999, this.message);
  }

  getStatusCode() {
    return ErrorType[this.constructor.name.replace('Error', '')] || E(500, 999);
  }
};