const { DataTypes, Model } = require('sequelize');

module.exports = class MenuGroupMap extends Model {
  static init(sequelize) {
    return super.init({
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '메뉴 식별자',
      },
      menuGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '메뉴그룹 식별자',
      },
      reference: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '그룹 내 참조 메뉴(상위메뉴) 식별자 (최상위 메뉴일 경우 0)',
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '그룹 내 메뉴 레벨 (최소값 1)',
      },
      step: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '그룹 내 메뉴 순서 (최소값 1)',
      },
      colCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '하위 메뉴 열 수 (메뉴 유형이 MENULIST일 경우만 해당)',
      },
      rowCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '하위 메뉴 행 수 (메뉴 유형이 MENULIST일 경우만 해당)',
      },
      created_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'MenuGroupMap',
      tableName: 'tb_menu_group_map',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: false,
    });
  }

  // TODO: 일단 UserGroup 이 MenuGroup을 참조하는 것으로 지정
  static associate(models) {
    models.MenuGroupMap.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      targetKey: 'id' });
    models.MenuGroupMap.belongsTo(models.MenuGroup, {
      foreignKey: 'menuGroupId',
      targetKey: 'id' });
  }
};
