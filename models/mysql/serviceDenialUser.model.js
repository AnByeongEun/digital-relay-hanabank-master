const models = require('./').models;

exports.countServiceDenialUser = async (params) => {
  // TODO: CountResponse [ex. {count: 1}]
  const result = await models.ServiceDenialUser.count({
    where: { ani: params.ani },
  });
  return result;
};

exports.getServiceDenialUser = async (params) => {
  const result = await models.ServiceDenialUser.findOne({
    where: { ani: params.ani },
  });
  return result;
};