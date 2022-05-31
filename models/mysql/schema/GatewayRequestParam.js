const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class GatewayRequestParam extends Model {
  static init(sequelize) {
    return super.init({
      gatewayRequestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'API 식별자',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '파라미터명',
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '파라미터 유형 [HEADER, QUERY, FORMDATA, PATH]',
      },
      valueType: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '데이터 유형 [String, Number, Boolean]',
      },
      isRequied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '필수 여부',
      },
      isNullable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Null 가능 여부',
      },
      minLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '최소 길이',
      },
      maxLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '최대 길이',
      },
      stringRegex: {
        type: DataTypes.STRING(100),
        comment: '정규표현식',
      },
      created_by: DataTypes.STRING(40),
      updated_by: DataTypes.STRING(40),
    }, {
      sequelize,
      modelName: 'GatewayRequestParam',
      tableName: 'tb_gateway_request_param',
      underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'removed_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }

  static associate(models) {
    models.GatewayRequestParam.belongsTo(models.GatewayRequest, {
      foreignKey: 'gatewayRequestId',
      targetKey: 'id' });
  }
};
