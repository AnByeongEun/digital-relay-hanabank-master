const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class Contact extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'CONTACT_ID',
      },
      channelKey: { // callbotKey, contactKey
        type: DataTypes.STRING(512),
        allowNull: false,
        field: 'CHANNEL_KEY',
        comment: '채널 키',
      },
      key: { // contactKey
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'KEY',
        comment: '컨택 키',
      },
      ani: {
        type: DataTypes.STRING(20),
        allowNull: false, // TODO: SOE optional 여부 확인
        field: 'ANI',
        comment: '전화번호',
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
      modelName: 'Contact',
      tableName: 'AC_MM_CONTACT',
      comment: '고객 접근 정보',
      // underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'REMOVE_DT',
      createdAt: 'INSERT_DT',
      updatedAt: 'UPDATE_DT',
    });
  }

  static associate(models) {
    models.Contact.hasMany(models.ContactAttribute, {
      foreignKey: 'contactId',
      sourceKey: 'id' });
    models.Contact.hasMany(models.ContactSession, {
      foreignKey: 'contactId',
      sourceKey: 'id' });
  }
};
