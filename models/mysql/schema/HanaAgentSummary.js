const { DataTypes, Model } = require('sequelize');

module.exports = class HanaAgentSummary extends Model {
  static init(sequelize) {
    const model = super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID',
      },
      haiSvcGrpCd: {
        type: DataTypes.STRING(16),
        field: 'HAI_SVC_GRP_CD',
        comment: '하이 서비스 그룹 코드',
      },
      ncsyDcmmtDvCd: {
        type: DataTypes.STRING(100),
        field: 'NCSY_DCMMT_DV_CD',
        comment: '필요서류 구분 코드',
      },
      step1: {
        type: DataTypes.STRING(16),
        field: 'STEP_1',
        comment: '1단계 코드',
      },
      step2: {
        type: DataTypes.STRING(16),
        field: 'STEP_2',
        comment: '2단계 코드',
      },
      step3: {
        type: DataTypes.STRING(16),
        field: 'STEP_3',
        comment: '3단계 코드',
      },
      step4: {
        type: DataTypes.STRING(16),
        field: 'STEP_4',
        comment: '4단계 코드',
      },
      step5: {
        type: DataTypes.STRING(16),
        field: 'STEP_5',
        comment: '5단계 코드',
      },
      step6: {
        type: DataTypes.STRING(16),
        field: 'STEP_6',
        comment: '6단계 코드',
      },
      cnt: {
        type: DataTypes.INTEGER,
        field: 'CNT',
        comment: '카운트',
      },
      bascDt: {
        type: DataTypes.STRING(16),
        field: 'BASC_DT',
        comment: '사용 날짜',
      },
    }, {
      sequelize,
      modelName: 'HanaAgentSummary',
      tableName: 'ICWM_BIZ_AGT_HIST',
      comment: '상담사 요약 통계',
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
