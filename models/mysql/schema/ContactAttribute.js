const { DataTypes, Model } = require('sequelize');

// TODO: field명 대문자 소문자
module.exports = class ContactAttribute extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'CONTACT_ATTRIBUTE_ID',
      },
      contactId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'CONTACT_ID',
        comment: '컨택 식별자',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'NAME',
        comment: '속성명',
      },
      value: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'VALUE',
        comment: '속성값',
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
      modelName: 'ContactAttribute',
      tableName: 'AC_MM_CONTACT_ATTRIBUTE',
      comment: '고객 접근 정보 속성',
      // underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정
      deletedAt: 'REMOVE_DT',
      createdAt: 'INSERT_DT',
      updatedAt: 'UPDATE_DT',
    });
  }

  static associate(models) {
    models.ContactAttribute.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      targetKey: 'id' });
  }
};
