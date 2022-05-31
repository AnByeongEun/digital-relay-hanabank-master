const { DataTypes, Model } = require('sequelize');

module.exports = class HanaNecessaryDocumentPriorityDate extends Model {
  static init(sequelize) {
    return super.init({
      createKey: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'CREATE_KEY',
        comment: '데이터 KEY',
      },
      confType: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: '우선순위 노출 타입',
        filed: 'CONF_TYPE',
      },
      startDate: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '시작 날짜',
        filed: 'START_DATE',
        primaryKey: true,
      },
      endDate: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '종료 날짜',
        filed: 'END_DATE',
        primaryKey: true,
      },
      createUser: {
        type: DataTypes.STRING(128),
        allowNull: false,
        filed: 'CREATE_USER',
        comment: '생성자 ID',
      },
      creatreTime: {
        type: DataTypes.STRING(128),
        allowNull: false,
        filed: 'CREATRE_TIME',
        comment: '생성 전체 시간',
      },
      creatreYMD: {
        type: DataTypes.STRING(128),
        allowNull: false,
        filed: 'CREATRE_YMD',
        comment: '생성 날짜',
      },
      chType: {
        type: DataTypes.STRING(32),
        allowNull: false,
        filed: 'CH_TYPE',
        comment: '채널 구분',
      },
      viewcheck: {
        type: DataTypes.STRING(32),
        allowNull: false,
        filed: 'VIEWCHECK',
        comment: '사용여부',
      },
    }, {
      sequelize,
      modelName: 'HanaNecessaryDocumentPriorityDate',
      tableName: 'ICWM_PRI_DATE_INFO',
      underscored: false,
      paranoid: false, // 정책에 따라 soft/hard 결정, 혹시
      createdAt: false, // locked_at이 createdAt와 동일
      updatedAt: false, // 수정할 일 없을듯
      timestamps: false, // createdAt, updatedAt 을 자동으로 생성하고 관리함
    });
  }
};
