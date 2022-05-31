const { DataTypes, Model } = require('sequelize');

module.exports = class ServiceDenialUser extends Model {
  static init(sequelize) {
    return super.init({
      ani: {
        type: DataTypes.STRING(20),
        allowNull: false, // Not Null
        comment: '전화번호',
      },
      requestFrom: {
        type: DataTypes.STRING(100),
        comment: '서비스 요청 경로',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'ServiceDenialUser',
      tableName: 'tb_service_denial_user',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // indexes: [
      //   { unique: true, fields: ['ani', 'removed_at'] },
      // ],
    });
  }
};
