const { DataTypes, Model } = require('sequelize');

module.exports = class AdminAccount extends Model {
  static init(sequelize) {
    return super.init({
      account: {
        type: DataTypes.STRING(20),
        allowNull: false, // Not Null
        comment: '계정명',
      },
      passwd: {
        type: DataTypes.STRING(512),
        allowNull: false, // Not Null
        comment: '비밀번호',
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false, // Not Null
        comment: '이름',
      },
      email: {
        type: DataTypes.STRING(255),
        comment: '이메일',
      },
      phone: {
        type: DataTypes.STRING(15),
        comment: '전화번호',
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Not Null
        defaultValue: false,
        comment: '접속 차단여부',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminAccount',
      tableName: 'tb_admin_account',
      underscored: true,
      paranoid: false, // 계정 정보는 남기지 않음
      // deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.AdminAccount.hasMany(models.AdminSession, {
      foreignKey: 'adminAccountId',
      sourceKey: 'id' });
    models.AdminAccount.hasMany(models.AdminAuthGroupMap, {
      foreignKey: 'adminAccountId',
      sourceKey: 'id' });
  }
};
