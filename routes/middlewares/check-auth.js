const moment = require('moment');

const ContactRepository = require('../../repository/contact.repository');
const jwt = require('../../modules/jwt');

const messages = require('../../messages');
const logger = require(global._resolve('/modules/winston')).logger;

const utils = require(global._resolve('/common/utils'));

// TODO: prometheus logging 추가

module.exports = (role) => {
  return async (req, res, next) => {
    try {
      if (process.env.AUTH_PASS === 'true') {
        return next();
      }

      if (process.env.CHECK_WORK_TIME === 'true') { // TODO: Boolean
        const remoteHost = req.header('RemoteHost'); // X-Forwarded-For, req.connection.remoteAddress
        const remoteServerHost = req.header('RemoteServerHost');

        // 1. remoteHost가 있고 accessToken이 없는 경우만 서버로 인식
        const fromServer = remoteHost && !remoteServerHost;

        if (fromServer) {
          const remoteServerHosts = process.env.REMOTE_SERVER_HOSTS ? JSON.parse(process.env.REMOTE_SERVER_HOSTS) : [];
          // 2. RemoteHost가 등록된 REMOTE_SERVER_HOSTS에 존재하는지 확인
          if (remoteServerHosts.includes(remoteServerHost)) {
            try {
              // base64 아닐경우 error throw
              const decodedApiKey = utils.decryptBase64(remoteHost);
              const decodedSecret = utils.decryptBase64(process.env.REMOTE_REQUEST_KEY);
              if (decodedApiKey === decodedSecret) {
                next();
              } else {
                throw new messages.error.AuthenticationFailureError('Wrong Secret');
              }
            } catch (error) {
              throw new messages.error.InvalidFormatError(error.message);
            }
          } else {
            throw new messages.error.UnknownRemoteHostError(remoteHost);
          }
        } else {
          // 하나은행은 Server 인증 방식(encoded api key)만 사용하므로 !fromServer 일 경우 에러 반환
          throw new messages.error.AuthenticationFailureError('Missing Secret');
        }
      } else {
        throw new messages.error.AuthenticationFailureError('Not Working Time');
      }
    } catch (error) {
      logger.warn(error);
      next(error);
    }
  };
};