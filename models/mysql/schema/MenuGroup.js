const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class MenuGroup extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '메뉴그룹명',
      },
      description: {
        type: DataTypes.STRING(1000),
        comment: '메뉴그룹 설명',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'MenuGroup',
      tableName: 'tb_menu_group',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  // TODO: 일단 UserGroup 이 MenuGroup을 참조하는 것으로 지정
  static associate(models) {
    models.MenuGroup.hasMany(models.MenuGroupMap, {
      foreignKey: 'menuGroupId',
      sourceKey: 'id' });
    models.MenuGroup.hasMany(models.UserGroup, {
      foreignKey: 'menuGroupId',
      sourceKey: 'id' });
  }
};
