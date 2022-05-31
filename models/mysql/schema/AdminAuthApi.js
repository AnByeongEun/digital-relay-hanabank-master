const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthApi extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(40),
        allowNull: false, // Not Null
        comment: 'API명',
      },
      path: {
        type: DataTypes.STRING(1000),
        allowNull: false, // Not Null
        comment: 'API 경로',
      },
      query: {
        type: DataTypes.STRING(2000),
        comment: '파라미터',
      },
      method: {
        type: DataTypes.STRING(10),
        comment: '호출 방식',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthApi',
      tableName: 'tb_admin_auth_api',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminAuthApi.hasMany(models.AdminAuthApiMap, {
      foreignKey: 'adminAuthApiId',
      sourceKey: 'id' });
  }
};
