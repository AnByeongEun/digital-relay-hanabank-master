const { DataTypes, Model } = require('sequelize');

module.exports = class HanaNecessaryDocumentPriority extends Model {
  static init(sequelize) {
    return super.init({
      createKey: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'CREATE_KEY',
        comment: '데이터 KEY',
        primaryKey: true,
      },
      confType: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'CONF_TYPE',
        comment: '우선순위 노출 타입',
        primaryKey: true,
      },
      priGroupCd: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'PRI_GROUP_CD',
        comment: '필요서류 그룹 코드',
      },
      priStepCd: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'PRI_STEP_CD',
        comment: '코드',
      },
      priStepNm: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'PRI_STEP_NM',
        comment: '이름',
      },
      priStepOd: {
        type: DataTypes.INTEGER(64),
        field: 'PRI_STEP_OD',
        allowNull: false,
        comment: '뎁스 순서',
      },
      startDate: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'START_DATE',
        comment: '시작 날짜',
      },
      endDate: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'END_DATE',
        comment: '종료 날짜',
      },
      createUser: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'CREATE_USER',
        comment: '생성자 ID',
      },
      createTime: {
        type: DataTypes.STRING(238),
        allowNull: false,
        field: 'UPDATE_TIME',
        comment: '생성 전체 시간',
      },
      createYmd: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'CREATE_YMD',
        comment: '생성 날짜',
      },
    }, {
      sequelize,
      modelName: 'HanaNecessaryDocumentPriority',
      tableName: 'AC_MM_PRI_BIZ_INFO',
      comment: '필요서류 우선순위',
      underscored: false,
      paranoid: false, // 정책에 따라 soft/hard 결정, 혹시 모르니
      // id: '',
      createdAt: false, // locked_at이 createdAt와 동일
      updatedAt: false, // 수정할 일 없을듯
      timestamps: false,
    });
  }
};
