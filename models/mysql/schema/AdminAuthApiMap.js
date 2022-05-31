const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthApiMap extends Model {
  static init(sequelize) {
    return super.init({
      adminAuthPageId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '페이지 식별자',
      },
      adminAuthApiId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: 'API 권한 식별자',
      },
      created_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthApiMap',
      tableName: 'tb_admin_auth_api_map',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: false,
    });
  }

  static associate(models) {
    models.AdminAuthApiMap.belongsTo(models.AdminAuthPage, {
      foreignKey: 'adminAuthPageId',
      targetKey: 'id' });
    models.AdminAuthApiMap.belongsTo(models.AdminAuthApi, {
      foreignKey: 'adminAuthApiId',
      targetKey: 'id' });
  }
};
