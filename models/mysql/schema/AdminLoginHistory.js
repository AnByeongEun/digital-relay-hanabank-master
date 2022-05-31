const { DataTypes, Model } = require('sequelize');

module.exports = class AdminLoginHistory extends Model {
  static init(sequelize) {
    return super.init({
      adminAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Not Null
        comment: '관리자 계정 식별자',
      },
      isSuccess: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Not Null
        defaultValue: false,
        comment: '로그인 성공 여부',
      },
      created_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'AdminLoginHistory',
      tableName: 'tb_admin_login_history',
      underscored: true,
      paranoid: false, // History는 soft deletion 사용하지 않음
      // deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: false,
    });
  }
};
