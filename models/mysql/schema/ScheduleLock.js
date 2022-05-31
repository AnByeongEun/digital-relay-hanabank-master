const Sequelize = require('sequelize');
const { DataTypes, Model } = require('sequelize');

module.exports = class ScheduleLock extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'SCHEDULE_LOCK_ID',
      },
      schedulerName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'SCHEDULE_NM',
        comment: '스케쥴명 (작업 종류)',
      },
      nodeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'NODE_NM',
        comment: '노드명 (작업 수행 서버명)',
      },
      dateCriteria: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'DATE_CRITERIA',
        comment: '시도 기준 일자',
      },
      lockUntil: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'LOCK_UNTIL',
        comment: 'Lock 유효 시간',
      },
      lockedAt: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'LOCKED_AT',
        // defaultValue: Sequelize.NOW,
        comment: 'Lock 설정 시간 (HHmmssSSS)',
      },
    }, {
      sequelize,
      modelName: 'ScheduleLock',
      tableName: 'AC_MM_SCHEDULE_LOCK',
      comment: '스케쥴러 락',
      // underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정, 혹시 모르니
      deletedAt: 'REMOVE_DT',
      createdAt: false, // locked_at이 createdAt와 동일
      updatedAt: false, // 수정할 일 없을듯
    });
  }
};
