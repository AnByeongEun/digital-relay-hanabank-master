const models = require('./').models;
const sequelizeInstance = require('./').sequelize;

const sequelize = require('sequelize');
const Op = sequelize.Op;

const messages = require('../../messages');

// TODO: Transaction 처리

/* ===================================================
 * Contact
 * =================================================== */

exports.createContact = async (params) => {
  const attributeList = Object.keys(params.attributes).map(key => {
    return { name: key, value: params.attributes[key] };
  });

  const result = await sequelizeInstance.transaction(async (t) => {
    const contact = await models.Contact.create({
      channelKey: params.channelKey,
      key: params.contactKey,
      ani: params.ani,
      // createdBy: 'XXX',
      // updatedBy: 'XXX',
      ContactAttributes: attributeList,
    }, {
      include: [models.ContactAttribute],
      transaction: t,
    });
    return contact;
  });
  return result;
};

exports.getContact = async (params) => {
  const result = await models.Contact.findByPk(params.id);
  return result;
};

exports.getContactByRefreshToken = async (params) => {
  const result = await models.Contact.findOne({
    include: [
      {
        attributes: [],
        model: models.ContactSession,
        where: { refreshToken: params.refreshToken },
        required: true,
      },
    ],
  });
  return result;
};

exports.getContactByChannelKey = async (params) => {
  const result = await models.Contact.findOne({
    where: {
      channelKey: params.channelKey,
    },
    include: [
      { model: models.ContactAttribute, required: false }, // left join ??
    ],
  });
  return result;
};

exports.getContactByAniAndChannelKeyAndKey = async (params) => {
  const result = await models.Contact.findOne({
    where: {
      ani: params.ani,
      channelKey: params.channelKey,
      key: params.key,
    },
    include: [
      { model: models.ContactAttribute, required: false },
    ],
  });
  return result;
};

exports.getContactListByAni = async (params) => {
  const result = await models.Contact.findAll({
    where: {
      ani: params.ani,
    },
    order: [
      ['id', 'DESC'],
    ],
    include: [
      { model: models.ContactAttribute, required: false }, // left join ??
    ],
  });
  return {
    contents: result,
    totalCount: result.length,
  };
};

exports.updateContactStatus = async (params) => {
  const contact = await models.Contact.findOne({
    where: {
      channelKey: params.channelKey,
    },
  });
  if (!contact) {
    throw new messages.error.NotFoundDataError('Contact');
  }
  const result = await sequelizeInstance.transaction(async (t) => {
    const updateResult = await models.ContactAttribute.update({
      value: params.status,
    }, {
      where: {
        contactId: contact.id,
        name: 'status',
      },
      transaction: t,
    });
    return updateResult;
  });
  return result;
};

/* ===================================================
 * Contact Session
 * =================================================== */

exports.createContactSession = async (params) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const contactSession = await models.ContactSession.create({
      contactId: params.contactId,
      refreshToken: params.refreshToken,
      expireAt: params.expireAt,
      // createdBy: 'XXX',
    }, { transaction: t });
    return contactSession;
  });
  return result;
};

exports.getContactSessionByContact = async (params) => {
  const result = await models.ContactSession.findAll({
    where: {
      contactId: params.contactId,
    },
  });
  return result;
};

exports.getContactSessionByRefreshToken = async (params) => {
  const result = await models.ContactSession.findOne({
    where: {
      refreshToken: params.refreshToken,
    },
  });
  return result;
};

exports.updateContactSession = async (params) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const updateResult = await models.ContactSession.update({
      refreshToken: params.refreshToken,
      expireAt: params.expireAt,
    }, {
      where: {
        contactId: params.contactId,
      },
      transaction: t,
    });
    return updateResult;
  });
  return result;
};

exports.deleteContactSessionByContact = async (params) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const deleteResult = await models.ContactSession.destroy({
      where: {
        contactId: params.contactId,
      },
      transaction: t,
    });
    return deleteResult;
  });
  return result;
};

exports.deleteContactSessionExpired = async (params) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const deleteResult = await models.ContactSession.destroy({
      where: {
        contactId: params.contactId,
        expireAt: {
          [Op.lt]: new Date(),
        },
      },
      transaction: t,
    });
    return deleteResult;
  });
  return result;
};