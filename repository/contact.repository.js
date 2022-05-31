// TODO: 각 model은 같은 함수 목록 가지고 있어야함 (그래야하나?)
const ContactModel = require(`../models/${process.env.DATABASE_TYPE}/contact.model`);

/* ===================================================
 * Contact
 * =================================================== */

exports.createContact = async (params) => {
  return await ContactModel.createContact(params);
};

exports.getContact = async (params) => {
  return await ContactModel.getContact(params);
};

exports.getContactByRefreshToken = async (params) => {
  return await ContactModel.getContactByRefreshToken(params);
};

exports.getContactByChannelKey = async (params) => {
  return await ContactModel.getContactByChannelKey(params);
};

exports.getContactByAniAndChannelKeyAndKey = async (params) => {
  return await ContactModel.getContactByAniAndChannelKeyAndKey(params);
};

exports.getContactListByAni = async (params) => {
  return await ContactModel.getContactListByAni(params);
};

exports.updateContactStatus = async (params) => {
  return await ContactModel.updateContactStatus(params);
};

/* ===================================================
 * Contact Session
 * =================================================== */

exports.createContactSession = async (params) => {
  return await ContactModel.createContactSession(params);
};

exports.getContactSessionByContact = async (params) => {
  return await ContactModel.getContactSessionByContact(params);
};

exports.getContactSessionByRefreshToken = async (params) => {
  return await ContactModel.getContactSessionByRefreshToken(params);
};

exports.updateContactSession = async (params) => {
  return await ContactModel.updateContactSession(params);
};

exports.deleteContactSessionByContact = async (params) => {
  return await ContactModel.deleteContactSessionByContact(params);
};

exports.deleteContactSessionExpired = async (params) => {
  return await ContactModel.deleteContactSessionExpired(params);
};