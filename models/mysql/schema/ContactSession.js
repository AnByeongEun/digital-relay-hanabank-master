const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class ContactSession extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'CONTACT_SESSION_ID',
      },
      contactId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'CONTACT_ID',
        comment: '컨택 식별자',
      },
      refreshToken: {
        type: DataTypes.STRING(300),
        allowNull: false,
        field: 'REFRESH_TOKEN',
        comment: 'Refresh Token (Thru)',
      },
      expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'EXPIRE_DT',
        comment: '만료 시간',
      },
      created_by: {
        type: DataTypes.STRING(40),
        field: 'INSERT_BY',
      },
      updated_by: {
        type: DataTypes.STRING(40),
        field: 'UPDATE_BY',
      },
    }, {
      sequelize,
      modelName: 'ContactSession',
      tableName: 'AC_MM_CONTACT_SESSION',
      comment: '고객 접근 세션 정보',
      // underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'REMOVE_DT',
      createdAt: 'INSERT_DT',
      updatedAt: 'UPDATE_DT',
    });
  }

  static associate(models) {
    models.ContactSession.belongsTo(models.Contact, { // TODO: 1:1이어야 함
      foreignKey: 'contactId',
      targetKey: 'id' });
  }
};
