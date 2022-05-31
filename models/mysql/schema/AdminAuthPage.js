const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthPage extends Model {
  static init(sequelize) {
    return super.init({
      pageName: {
        type: DataTypes.STRING(40),
        allowNull: false, // Not Null
        comment: '페이지명',
      },
      path: {
        type: DataTypes.STRING(1000),
        allowNull: false, // Not Null
        comment: '페이지 경로',
      },
      query: {
        type: DataTypes.STRING(1000),
        comment: '파라미터',
      },
      type: {
        type: DataTypes.STRING(20),
        comment: '페이지 유형 [FULL, POPUP]',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthPage',
      tableName: 'tb_admin_auth_page',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminAuthPage.hasMany(models.AdminAuthPageMap, {
      foreignKey: 'adminAuthPageId',
      sourceKey: 'id' });
    models.AdminAuthPage.hasMany(models.AdminAuthApiMap, {
      foreignKey: 'adminAuthPageId',
      sourceKey: 'id' });
    models.AdminAuthPage.hasMany(models.AdminAuthComponent, {
      foreignKey: 'adminAuthPageId',
      sourceKey: 'id' });
  }
};
