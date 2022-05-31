const { DataTypes, Model } = require('sequelize');

module.exports = class HanaAgentSummary extends Model {
  static init(sequelize) {
    const model = super.init({
      startTime: {
        type: DataTypes.STRING(128),
        comment: '인입시간',
        field: 'START_TIME',
        primaryKey: true,
      },
      ymd: {
        type: DataTypes.STRING(64),
        comment: '인입날짜',
        field: 'YMD',
      },
      hh24mi: {
        type: DataTypes.STRING(32),
        comment: '인입시간',
        field: 'HH24MI',
      },
      chType: {
        type: DataTypes.STRING(32),
        comment: '채널타입',
        field: 'CH_TYPE',
      },
      contactKey: {
        type: DataTypes.STRING(244),
        comment: '컨택키',
        field: 'CONTACT_KEY',
      },
      callKey: {
        type: DataTypes.STRING(255),
        comment: '콜봇키',
        field: 'CALL_KEY',
      },
      webKey: {
        type: DataTypes.STRING(255),
        comment: '웹키',
        field: 'WEB_KEY',
        primaryKey: true,
      },
      linkKey: {
        type: DataTypes.STRING(255),
        comment: '링크키',
        field: 'LINK_KEY',
      },
      dnis: {
        type: DataTypes.STRING(32),
        comment: 'DNIS',
        field: 'DNIS',
      },
      sendType: {
        type: DataTypes.STRING(32),
        comment: '발송구분',
        field: 'SEND_TYPE',
      },
      svcType: {
        type: DataTypes.STRING(32),
        comment: '서비스구분',
        field: 'SVC_TYPE',
      },
      totalCnt: {
        type: DataTypes.STRING(32),
        comment: '주변 영업점 개수',
        field: 'TOTAL_CNT',
      },
      branchTargetText: {
        type: DataTypes.STRING(255),
        comment: '영업점 찾기 텍스트',
        field: 'BRANCH_TARGET_TEXT',
      },
      branchId: {
        type: DataTypes.STRING(255),
        comment: '영업점 코드',
        field: 'BRANCH_ID',
      },
      branchName: {
        type: DataTypes.STRING(255),
        comment: '영업점 명칭',
        field: 'BRACN_ADDR',
      },
      branchAddr: {
        type: DataTypes.STRING(255),
        comment: '영업점 주소',
        field: 'BRANCH_ADDR',
      },
      wayAddr: {
        type: DataTypes.STRING(255),
        comment: '오시는길',
        field: 'WAY_ADDR',
      },
      parkInfo: {
        type: DataTypes.STRING(255),
        comment: '주차정보',
        field: 'PARK_INFO',
      },
      branchAni: {
        type: DataTypes.STRING(255),
        comment: '영업점 전화번호',
        field: 'BRANCH_ANI',
      },
      branchFax: {
        type: DataTypes.STRING(255),
        comment: '영업점 팩스',
        field: 'BRACN_FAX',
      },
      branch365: {
        type: DataTypes.STRING(255),
        comment: '365코너',
        field: 'BRANCH_365',
      },
      branchBh: {
        type: DataTypes.STRING(255),
        comment: '영업 시간',
        field: 'BRANCH_BH',
      },
      brNo: {
        type: DataTypes.STRING(255),
        comment: '영업점 번호',
        field: 'BR_NO',
      },
      comCanTrsDvCd: {
        type: DataTypes.STRING(255),
        comment: '공통취소거래구분코드',
        field: 'COM_CAN_TRS_DV_CD',
      },
      hanaFncHldgsGrcoCd: {
        type: DataTypes.STRING(255),
        comment: '하나금융 지주 그룹사 코드',
        field: 'HANA_FNC_HLDGS_GRCO_CD',
      },
      conOs: {
        type: DataTypes.STRING(255),
        comment: '접촉os',
        field: 'CON_OS',
      },
      conDevice: {
        type: DataTypes.STRING(255),
        comment: '접촉Device',
        field: 'CON_DEVICE',
      },
      conBrowser: {
        type: DataTypes.STRING(255),
        comment: '접촉 Browser',
        field: 'CON_BROWSER',
      },
      returnYn: {
        type: DataTypes.STRING(32),
        comment: '재진입여부',
        field: 'RETURN_YN',
      },
      lastFlag: {
        type: DataTypes.STRING(32),
        comment: '최종 사용여부',
        field: 'LAST_FLAG',
      },
      shareYn: {
        type: DataTypes.STRING(32),
        comment: '공유여부',
        field: 'SHARE_YN',
      },
      shareKey: {
        type: DataTypes.STRING(255),
        comment: '공유링크 키',
        field: 'SHARE_KEY',
      },
    }, {
      sequelize,
      modelName: 'HanaBranchHist',
      tableName: 'ICWM_BR_E_HIST',
      comment: '영업점 사용 이력',
      underscored: false,
      paranoid: false, // 정책에 따라 soft/hard 결정, 혹시 모르니
      createdAt: false, // locked_at이 createdAt와 동일
      updatedAt: false, // 수정할 일 없을듯
      timestamps: false,
    });

    model.removeAttribute('id');
    return model;
  }
};
