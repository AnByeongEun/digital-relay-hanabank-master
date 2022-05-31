const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthGroupMap extends Model {
  static init(sequelize) {
    return super.init({
      adminAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '관리자 계정 식별자',
      },
      adminAuthGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '관리자 권한 그룹 식별자',
      },
      created_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthGroupMap',
      tableName: 'tb_admin_auth_group_map',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: false,
    });
  }

  static associate(models) {
    models.AdminAuthGroupMap.belongsTo(models.AdminAccount, {
      foreignKey: 'adminAccountId',
      targetKey: 'id' });
    models.AdminAuthGroupMap.belongsTo(models.AdminAuthGroup, {
      foreignKey: 'adminAuthGroupId',
      targetKey: 'id' });
  }
};
