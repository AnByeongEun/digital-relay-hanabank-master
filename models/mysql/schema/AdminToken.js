const { DataTypes, Model } = require('sequelize');

module.exports = class AdminToken extends Model {
  static init(sequelize) {
    return super.init({
      adminSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '관리자 세션 식별자',
      },
      accessToken: {
        type: DataTypes.STRING(300),
        allowNull: false, // Not Null
        comment: 'Access Token (Admin)',
      },
      requestCount: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        defaultValue: 0,
        comment: '요청 횟수',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminToken',
      tableName: 'tb_admin_token',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminToken.belongsTo(models.AdminSession, {
      foreignKey: 'adminSessionId',
      targetKey: 'id' });
  }
};
