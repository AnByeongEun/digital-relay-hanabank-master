// https://github.com/eivindfjeldstad/validate
const Validate = require('validate');

const schemas = require('../../common/validation');

const messages = require('../../messages');

const schema = {
  ...schemas.apiSchema,
  ...schemas.webSchema,
  ...schemas.contactSchema,
};

module.exports = (name) => {
  if (!Object.prototype.hasOwnProperty.call(schema, name)) {
    console.error(`====> Validation Schema [${name}] is not defined`);
  }
  const validator = new Validate(schema[name]);

  return (req, res, next) => {
    // object, array 검증에 대한 validate 모듈 버그있음 (deep copy 필요)
    const params = JSON.parse(JSON.stringify(req.body)); // TODO: query param에 대한 검증 필요시 수정 필요
    const result = validator.validate(params);
    if (result.length > 0) {
      // 정의된 error type에 기본 정보들이 포함되어 있고 로그 등의 일관된 처리를 위해 error handler에서 응답하도록 함
      next(new messages.error.InvalidParametersError(result[0].message));
    } else {
      next();
    }
  };
};