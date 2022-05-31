const MenuRepository = require('../repository/menu.repository');
const CodeRepository = require('../repository/code.repository');
const ServiceDenialUserRepository = require('../repository/serviceDenialUser.repository');
const UserGroupRepository = require('../repository/userGroup.repository');
const ViewActionRepository = require('../repository/viewAction.repository');

const journeyApi = require('../api/journey.api');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class ViewService {
  constructor() {}

  // 링크 키 조회 (TODO: ivr에 있어야 함? SOE꺼 확인해보자)
  async getLinkKeyInfo(linkKey) {
    try {
      const journeyResponse = await journeyApi.slinkGetdata({
        CH_TYPE: 'MWEB',
        LINK_KEY: linkKey,
      });

      // error count
      // session time
      // token (x)
      // is service denial user

      return new messages.journey.LinkKeyData(journeyResponse);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 메뉴 목록 조회 (type, position, url)
  async getMenuList(type, position, url) {
    try {
      const response = (await MenuRepository.getMenuList({ type, position, url }))
        .map(menu => new messages.server.response.MenuResponse(menu));
      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 그룹에 포함된 메뉴 목록 조회 (groupName)
  async getMenuListByGroup(groupName) {
    try {
      const response = (await MenuRepository.getMenuListByGroup({ groupName }))
        .map(menu => new messages.server.response.MenuResponse(menu));
      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 사용자 유형에 연결된 메뉴 목록 조회 (userType)
  async getMenuListByUserType(userType) {
    try {
      const response = (await MenuRepository.getMenuListByUserType({ userType }))
        .map(menu => new messages.server.response.MenuResponse(menu));
      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 메뉴 그룹 목록 조회 (groupName)
  async getMenuGroupList(groupName) {
    try {
    // TODO: groupName property 없을때 처리 추후 결정
    //    지금은 값 없으면 전체 목록 조회하도록 함
      const response = (await MenuRepository.getMenuGroupList({ groupName }))
        .map(menuGroup => new messages.server.response.MenuGroupResponse(menuGroup));
      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 사용자 그룹 목록 조회
  async getUserGroupList() {
    try {
      // TODO: 필터 필요시 추가
      const response = (await UserGroupRepository.getUserGroupList({ }))
        .map(userGroup => new messages.server.response.UserGroupResponse(userGroup));
      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 공통 코드 조회 (code)
  async getCommonCode(code) {
    try {
      const response = await CodeRepository.getCommonCode({ code });

      if (response) {
        return new messages.server.response.CommonCodeResponse(response);
      } else {
        throw new messages.error.NotFoundDataError('CommonCode'); // TODO: ENUM?
      }
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // 공통 코드 목록 조회 (codeGroup)
  async getCommonCodeListByGroup(codeGroup) {
    try {
      const response = (await CodeRepository.getCommonCodeListByGroup({ codeGroup }))
        .map(code => new messages.server.response.CommonCodeResponse(code));
      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // TODO: 토큰, 웹키 인증 없음
  // 서비스 거부 사용자 여부 확인
  async checkServiceDenialUser(ani) {
    try {
      const serviceDenialUser = await ServiceDenialUserRepository.getServiceDenialUser({ ani });
      return new messages.server.common.BooleanResponse(serviceDenialUser);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // View Action 저장
  async createViewAction(linkKey, name, actionType, code) {
    try {
      const response = await ViewActionRepository.createViewAction({ linkKey, name, actionType, code });
      return response;
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // View Action 목록 조회
  async getViewActionList(linkKey) {
    try {
    // 미처리 View Action 목록 조회
      const response = await ViewActionRepository.getViewActionList({ linkKey });
      // 조회된 항목 isProcessed = true 로 변경
      await ViewActionRepository.updateViewActionProcessed({ linkKey });

      return new messages.server.common.ListResponse(response);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // View Action 삭제
  async deleteViewActions(linkKey) {
    try {
      const response = await ViewActionRepository.deleteViewAction({ linkKey });
      return response;
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }
};
