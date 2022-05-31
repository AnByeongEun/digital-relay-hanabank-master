const models = require('./').models;

exports.getRequestParamListByMethodAndPath = async (params) => {
  const result = await models.GatewayRequest.findOne({
    where: {
      method: params.method,
      path: params.path,
    },
    include: [
      { model: models.GatewayRequestParam, required: false },
    ],
  });
  return result;
};