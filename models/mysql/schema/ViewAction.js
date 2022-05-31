const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class ViewAction extends Model {
  static init(sequelize) {
    return super.init({
      linkKey: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '링크키',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '동작명',
      },
      actionType: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '동작 유형',
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '코드 (IVR 멘트)',
      },
      isProcessed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '처리 여부',
      },
      isEnded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '종료 여부',
      },
    }, {
      sequelize,
      modelName: 'ViewAction',
      tableName: 'tb_view_action',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }
};
