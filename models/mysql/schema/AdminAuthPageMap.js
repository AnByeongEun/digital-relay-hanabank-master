const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthPageMap extends Model {
  static init(sequelize) {
    return super.init({
      adminAuthGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '관리자 권한 그룹 식별자',
      },
      adminAuthPageId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '페이지 식별자',
      },
      created_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthPageMap',
      tableName: 'tb_admin_auth_page_map',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: false,
    });
  }

  static associate(models) {
    models.AdminAuthPageMap.belongsTo(models.AdminAuthGroup, {
      foreignKey: 'adminAuthGroupId',
      targetKey: 'id' });
    models.AdminAuthPageMap.belongsTo(models.AdminAuthPage, {
      foreignKey: 'adminAuthPageId',
      targetKey: 'id' });
  }
};
