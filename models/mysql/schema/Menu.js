const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class Menu extends Model {
  static init(sequelize) {
    return super.init({
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '서비스 코드',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '메뉴명',
      },
      displayName: {
        type: DataTypes.STRING(50),
        comment: '화면에 노출될 메뉴명',
      },
      description: {
        type: DataTypes.STRING(1000),
        comment: '메뉴 설명',
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '메뉴 유형 [OUTLINK, STATIC, MENULIST]',
      },
      authenticationType: { // 공통 코드 참조
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '메뉴 접근시 필요 인증 유형',
      },
      isOnCall: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '메뉴 접근시 전화 상태 유지 여부',
      },
      imageLink: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '이미지 링크',
      },
      linkName: {
        type: DataTypes.STRING(100),
        comment: '해당 메뉴의 링크명',
      },
      linkUrl: {
        type: DataTypes.STRING(500),
        comment: '해당 메뉴의 링크 URL',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'Menu',
      tableName: 'tb_menu',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  // TODO: 일단 MenuGroupSub가 UserGroup을 참조하는 것으로 지정
  static associate(models) {
    models.Menu.hasMany(models.MenuGroupMap, {
      foreignKey: 'menuId',
      sourceKey: 'id' });
  }
};
