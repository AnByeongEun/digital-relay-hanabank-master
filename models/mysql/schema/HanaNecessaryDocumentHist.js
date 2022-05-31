const { DataTypes, Model } = require('sequelize');

module.exports = class HanaNecessaryDocument extends Model {
  static init(sequelize) {
    return super.init({
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
        type: DataTypes.STRING(255),
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
      bizStep1Cd: {
        type: DataTypes.STRING(32),
        field: 'BIZ_STEP1_CD',
        comment: '1.코드',
      },
      bizStep1Nm: {
        type: DataTypes.STRING(255),
        field: 'BIZ_STEP1_NM',
        comment: '1.이름',
      },
      bizStep2Cd: {
        type: DataTypes.STRING(32),
        field: 'BIZ_STEP2_CD',
        comment: '2.코드',
      },
      bizStep2Nm: {
        type: DataTypes.STRING(255),
        field: 'BIZ_STEP2_NM',
        comment: '2.이름',
      },
      bizStep3Cd: {
        type: DataTypes.STRING(32),
        field: 'BIZ_STEP3_CD',
        comment: '3.코드',
      },
      bizStep3Nm: {
        type: DataTypes.STRING(255),
        field: 'BIZ_STEP3_NM',
        comment: '3.이름',
      },
      bizStep4Cd: {
        type: DataTypes.STRING(32),
        field: 'BIZ_STEP4_CD',
        comment: '4.코드',
      },
      bizStep4Nm: {
        type: DataTypes.STRING(255),
        field: 'BIZ_STEP4_NM',
        comment: '4.이름',
      },
      bizStep5Cd: {
        type: DataTypes.STRING(32),
        field: 'BIZ_STEP5_CD',
        comment: '5.코드',
      },
      bizStep5Nm: {
        type: DataTypes.STRING(255),
        field: 'BIZ_STEP5_NM',
        comment: '5.이름',
      },
      bizStep6Cd: {
        type: DataTypes.STRING(32),
        field: 'BIZ_STEP6_CD',
        comment: '6.코드',
      },
      bizStep6Nm: {
        type: DataTypes.STRING(255),
        field: 'BIZ_STEP6_NM',
        comment: '6.이름',
      },
      addDcmtCtt: {
        type: DataTypes.TEXT,
        field: 'ADD_DCMT_CTT',
        comment: '필요 서류',
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
      lastBizStep: {
        type: DataTypes.STRING(64),
        comment: '최종 선택 단계',
        field: 'LAST_BIZ_STEP',
      },
    }, {
      sequelize,
      modelName: 'HanaNecessaryDocument',
      tableName: 'ICWM_BIZ_E_HIST',
      underscored: false,
      paranoid: false, // 정책에 따라 soft/hard 결정, 혹시 모르니
      createdAt: false, // locked_at이 createdAt와 동일
      updatedAt: false, // 수정할 일 없을듯
      timestamps: false,
    });
  }
};
