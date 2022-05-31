const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class CommonCode extends Model {
  static init(sequelize) {
    return super.init({
      codeGroup: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '코드 그룹',
      },
      codeGroupName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '코드 그룹명',
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '코드명',
      },
      value: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '값',
      },
      codeOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '순서',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '활성 여부',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'CommonCode',
      tableName: 'tb_common_code',
      defaultScope: {},
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }
};
