const RequestRepository = require('../../repository/request.repository');

const prometheusLogging = require('../../routes/common/prometheus');
const messages = require('../../messages');

const logger = require(global._resolve('/modules/winston')).logger;

const Validate = require('validate'); // TODO: 필요시 library 교체 (validator, express-validator 등)

const paramMandatoryValidation = (req, validations, res) => {
  // TODO: Table에 정의되지 않은 parameter는 어떻게 처리?
  const schema = {};

  validations.forEach((validation, index) => {
    let valueType = String;
    switch (validation.valueType) {
      case 'Number':
        valueType = Number;
        break;
      case 'Boolean':
        valueType = Boolean;
        break;
    }

    schema[validation.name] = {
      type: valueType,
      required: !!validation.isRequired,
    };

    if (validation.minLength > 0 || validation.maxLength > 0) {
      if (validation.minLength > 0 && validation.maxLength > 0) {
        if (validation.minLength > validation.maxLength) {
          // TODO: throw error, 여기 에러타면 default row 잘못 넣은것
          logger.error('Wrong Validate Condition');
        }
      }
      schema[validation.name].length = {};
    }

    if (validation.minLength > 0) {
      schema[validation.name].length.min = validation.minLength;
    }

    if (validation.maxLength > 0) {
      schema[validation.name].length.max = validation.maxLength;
    }

    if (validation.valueType === 'String' && validation.stringRegex) {
      try {
        schema[validation.name].match = new RegExp(`^${validation.stringRegex}$`);
      } catch (error) {
        throw new messages.error.InvalidRegularExpressionError(validation.stringRegex);
      }
    }
  });

  const validator = new Validate(schema);
  const params = JSON.parse(JSON.stringify(req.body));
  const result = validator.validate(params);

  if (result.length > 0) {
    // 정의된 error type에 기본 정보들이 포함되어 있고 로그 등의 일관된 처리를 위해 error handler에서 응답하도록 함
    throw new messages.error.InvalidParametersError(result[0].message);
  }
};

// required, min/max 체크 정도만 한다
// TODO: api table 개발 후 수정

module.exports = () => {
  return async (req, res, next) => {
    // TODO: 수정
    // TODO: prometheus logging
    try {
      const gatewayRequest = await RequestRepository.getRequestParamListByMethodAndPath({
        method: req.method,
        path: req.baseUrl + req.path,
      });
      const requestParams = gatewayRequest ? gatewayRequest.GatewayRequestParams : null;
      if (requestParams !== null && requestParams.length > 0) {
        console.log(paramMandatoryValidation(req, requestParams, res));
        next();
      } else {
        prometheusLogging(req, res);
        // TODO: validation 없는것 어떻게 처리?
        const error = new messages.error.InvalidParametersError('Plaese check Request Parameter');
        res.status(error.status).json(error.getResponse());
      }
    } catch (error) {
      prometheusLogging(req, res);
      res.status(error.status || 500).json(error.getResponse());
    }
  };
};