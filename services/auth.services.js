const ContactRepository = require('../repository/contact.repository');

const jwt = require('../modules/jwt');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class AuthService {
  constructor() {}

  // 토큰 발급 (ani, channelKey, contactKey)
  async issueToken(ani, channelKey, contactKey) {
    try {
    // 일단 재진입 고려 안함
    // 1. 랜딩(인트로) 페이지에서만 요청됨
    // 2. tb_contact 검사
    //  없으면 화면 런칭 과정에서 정상적으로 고객 정보 생성되지 않았다는 의미이거나 (그때 이미 실패 처리되었어야 함)
    //  다른 경로로 웹 화면에 진입한 고객이라는 의미 => 에러
    //  TODO: SMS 링크를 계속 누를 경우 처리 필요
      const contact = await ContactRepository.getContactByChannelKey({ channelKey });

      if (!contact) {
        throw new messages.error.NotFoundDataError('Contact');
      }
      // TODO: 일단, 기존에 토큰이 있다면 (만료된 토큰들) 다 delete 처리 (같은 채널키로 토큰을 다시 발급받을 수가 없음)
      const deleted = await ContactRepository.deleteContactSessionByContact({ contactId: contact.id });
      // 토큰 생성
      const token = jwt.sign({ ani, chKey: channelKey, key: contactKey });

      // TODO: 기존에 토큰이 있고 유효하다면? refresh 해준다
      // 기존에 토큰이 있고 유효하지 않다면? contactSession create
      // 기존에 토큰이 없다면? contactSession create
      // 일단 고려하지 않음.
      // const contactSessions = await ContactRepository.getContactSessionByContact({ contactId: contact.id });

      // 조회한 contact 정보와, 발행한 토큰 정보를 토대로 contact_session 생성
      const contactSession = await ContactRepository.createContactSession({
        contactId: contact.id,
        refreshToken: token.refreshToken,
        expireAt: new Date(jwt.expireTime(token.refreshToken)),
      });
      return new messages.server.common.TokenResponse(token);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 토큰 재발급 (refreshToken)
  async refreshToken(refreshToken) {
    try {
    // 토큰 유효성 & 만료시간 검사
      jwt.verify(refreshToken);
      // 새 토큰 발급을 위한 정보(ani, chKey, key)를 얻기 위해 Contact 조회
      const contact = await ContactRepository.getContactByRefreshToken({ refreshToken });
      if (!contact) {
        throw new messages.error.NotFoundDataError('Contact');
      }
      // 새 토큰 발급
      const token = jwt.sign({ ani: contact.ani, chKey: contact.channelKey, key: contact.key });
      const updatedContactSession = await ContactRepository.updateContactSession({
        contactId: contact.id,
        refreshToken: token.refreshToken,
        expireAt: new Date(jwt.expireTime(token.refreshToken)),
      });
      return new messages.server.common.TokenResponse(token);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }
};
