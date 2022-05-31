const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAuthComponent extends Model {
  static init(sequelize) {
    return super.init({
      adminAuthPageId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '권한 페이지 식별자',
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false, // Not Null
        comment: '요소명',
      },
      componentId: {
        type: DataTypes.STRING(200),
        allowNull: false, // Not Null
        comment: '요소 식별자',
      },
      authApiId: {
        type: DataTypes.INTEGER,
        comment: 'API 식별자 (컴포넌트에 API가 연결되어 있는 경우)',
      },
      authPageId: {
        type: DataTypes.INTEGER,
        comment: '페이지 식별자 (컴포넌트에 페이지가 연결되어 있는 경우)',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAuthComponent',
      tableName: 'tb_admin_auth_component',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminAuthComponent.belongsTo(models.AdminAuthPage, {
      foreignKey: 'adminAuthPageId',
      targetKey: 'id' });
  }
};
