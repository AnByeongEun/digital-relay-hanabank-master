const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class UserGroup extends Model {
  static init(sequelize) {
    return super.init({
      menuGroupId: {
        type: DataTypes.INTEGER,
        comment: '메뉴 그룹 식별자',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '사용자 그룹명',
      },
      description: {
        type: DataTypes.STRING(1000),
        comment: '사용자 그룹 설명',
      },
      userGroupType: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '사용자 그룹 유형',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'UserGroup',
      tableName: 'tb_user_group',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.UserGroup.belongsTo(models.MenuGroup, {
      foreignKey: 'menuGroupId',
      targetKey: 'id' });
  }
};
