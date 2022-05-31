const { DataTypes, Model } = require('sequelize');

module.exports = class AdminSession extends Model {
  static init(sequelize) {
    return super.init({
      adminAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '관리자 계정 식별자',
      },
      refreshToken: {
        type: DataTypes.STRING(300),
        allowNull: false, // Not Null
        comment: 'Refresh Token (Admin)',
      },
      expireAt: {
        type: DataTypes.DATE,
        allowNull: false, // Not Null
        comment: '만료 일시',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminSession',
      tableName: 'tb_admin_session',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminSession.belongsTo(models.AdminAccount, {
      foreignKey: 'adminAccountId',
      targetKey: 'id' });
    models.AdminSession.hasMany(models.AdminToken, {
      foreignKey: 'adminSessionId',
      sourceKey: 'id' });
  }
};
