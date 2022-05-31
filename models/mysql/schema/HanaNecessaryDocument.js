const { DataTypes, Model } = require('sequelize');

module.exports = class HanaNecessaryDocument extends Model {
  static init(sequelize) {
    const model = super.init({
      ncsyDcmtDvCd: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'NCSY_DCMT_DV_CD',
        comment: '그룹코드',
      },
      bizSeqNo: {
        type: DataTypes.INTEGER,
        field: 'BIZ_SEQ_NO',
        comment: '순서',
      },
      step1Cd: {
        type: DataTypes.STRING(32),
        field: 'STEP_1_CD',
        comment: '1.코드',
      },
      step1Nm: {
        type: DataTypes.STRING(255),
        field: 'STEP_1_NM',
        comment: '1.이름',
      },
      step2Cd: {
        type: DataTypes.STRING(32),
        field: 'STEP_2_CD',
        comment: '2.코드',
      },
      step2Nm: {
        type: DataTypes.STRING(255),
        field: 'STEP_2_NM',
        comment: '2.이름',
      },
      step3Cd: {
        type: DataTypes.STRING(32),
        field: 'STEP_3_CD',
        comment: '3.코드',
      },
      step3Nm: {
        type: DataTypes.STRING(255),
        field: 'STEP_3_NM',
        comment: '3.이름',
      },
      step4Cd: {
        type: DataTypes.STRING(32),
        field: 'STEP_4_CD',
        comment: '4.코드',
      },
      step4Nm: {
        type: DataTypes.STRING(255),
        field: 'STEP_4_NM',
        comment: '4.이름',
      },
      step5Cd: {
        type: DataTypes.STRING(32),
        field: 'STEP_5_CD',
        comment: '5.코드',
      },
      step5Nm: {
        type: DataTypes.STRING(255),
        field: 'STEP_5_NM',
        comment: '5.이름',
      },
      step6Cd: {
        type: DataTypes.STRING(32),
        field: 'STEP_6_CD',
        comment: '6.코드',
      },
      step6Nm: {
        type: DataTypes.STRING(255),
        field: 'STEP_6_NM',
        comment: '6.이름',
      },
      ncsyDcmts: {
        type: DataTypes.TEXT,
        field: 'NCSY_DCMTS',
        comment: '서류목록',
      },
      gudSntcCttsAll: {
        type: DataTypes.TEXT,
        field: 'GUD_SNTC_CTTS_ALL',
        comment: '안내 서류 전체',
      },
      gudSntcCttsN: {
        type: DataTypes.TEXT,
        field: 'GUD_SNTC_CTTS_N',
        comment: '안내 서류 일부(빨간글씨 제외)',
      },
      addDcmtCtt: {
        type: DataTypes.TEXT,
        field: 'ADD_DCMT_CTT',
        comment: '추가 서류',
      },
      ncsyDcmtGudCtt: {
        type: DataTypes.TEXT,
        field: 'NCSY_DCMT_GUD_CTT',
        comment: '수수료 안내',
      },
    }, {
      sequelize,
      modelName: 'HanaNecessaryDocument',
      // tableName: 'tb_necessary_document',
      tableName: 'ICWM_BIZ_INFO',
      comment: '필요서류 정보',
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
