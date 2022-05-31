const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class GatewayRequest extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: 'API명',
      },
      method: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'POST', // GET, POST
        comment: '호출 방식',
      },
      path: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '요청 경로',
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: 'API 설명',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'GatewayRequest',
      tableName: 'tb_gateway_request',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.GatewayRequest.hasMany(models.GatewayRequestParam, {
      foreignKey: 'gatewayRequestId',
      sourceKey: 'id' });
  }
};
