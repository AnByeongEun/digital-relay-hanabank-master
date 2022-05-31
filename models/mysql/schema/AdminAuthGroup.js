const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthGroup extends Model {
  static init(sequelize) {
    return super.init({
      groupName: {
        type: DataTypes.STRING(40),
        allowNull: false, // Not Null
        comment: '권한 그룹명',
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false, // Not Null
        comment: '권한 그룹 설명',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthGroup',
      tableName: 'tb_admin_auth_group',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminAuthGroup.hasMany(models.AdminAuthGroupMap, {
      foreignKey: 'adminAuthGroupId',
      sourceKey: 'id' });
    models.AdminAuthGroup.hasMany(models.AdminAuthPageMap, {
      foreignKey: 'adminAuthGroupId',
      sourceKey: 'id' });
  }
};
