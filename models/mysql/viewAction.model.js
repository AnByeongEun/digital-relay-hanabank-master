const models = require('./').models;

exports.createViewAction = async (params) => {
  const result = await models.ViewAction.create({
    linkKey: params.linkKey,
    actionType: params.actionType,
    name: params.name,
    code: params.code,
  });
  return result;
};

exports.getViewActionList = async (params) => {
  const result = await models.ViewAction.findAll({
    where: {
      linkKey: params.linkKey,
      isProcessed: false,
      isEnded: false, // TODO: 넣을까 뺄까
    },
  });
  return result;
};

exports.updateViewActionProcessed = async (params) => {
  const result = await models.ViewAction.update({
    isProcessed: true,
  }, {
    where: {
      linkKey: params.linkKey,
      isProcessed: false,
    },
  });
  return result;
};

exports.deleteViewAction = async (params) => {
  const result = await models.ViewAction.destroy({
    where: {
      linkKey: params.linkKey,
    },
  });
  return result;
};