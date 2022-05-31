const RequestRepository = require('../../repository/request.repository');

const prometheusLogging = require('../../routes/common/prometheus');
const messages = require('../../messages');

const logger = require(global._resolve('/modules/winston')).logger;

const Joi = require('joi');

const paramMandatoryValidation = (req, validations, res) => {
  // Table에 정의되지 않은 parameter가 입력되었으면 에러 처리
  const schema = {};
  validations.forEach((validation, index)=> {
    let object = Joi;

    switch (validation.valueType) {
      case 'String':
        object = object.string();
        break;
      case 'Number':
        object = object.number();
        break;
      case 'Boolean':
        object = object.boolean();
        break;
    }

    if (validation.isRequired) {
      object = object.required();
    }

    if (validation.minLength > 0 && validation.maxLength > 0) {
      if (validation.minLength > validation.maxLength) {
        // TODO: throw error, 여기 에러타면 default row 잘못 넣은것
        logger.error('Wrong Validate Condition');
      }
    }

    if (validation.minLength > 0) {
      object = object.min(validation.minLength);
    }

    if (validation.maxLength > 0) {
      object = object.max(validation.maxLength);
    }

    if (validation.valueType === 'String' && validation.stringRegex) {
      try {
        object = object.pattern(new RegExp(`^${validation.stringRegex}$`));
      } catch (error) {
        throw new messages.error.InvalidRegularExpressionError(validation.stringRegex);
      }
    }

    schema[validation.name] = object;
  });

  const validator = Joi.object(schema);
  const { error, value } = validator.validate(req.body);

  if (error) {
    throw new messages.error.InvalidParametersError(error.message);
  }
};

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