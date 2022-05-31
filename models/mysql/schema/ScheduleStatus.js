const { DataTypes, Model } = require('sequelize');

module.exports = class ScheduleStatus extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'SCHEDULE_STATUS_ID',
      },
      scheduleName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'SCHEDULE_NM',
        comment: '스케쥴명(작업 종류)',
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
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'STATUS',
        comment: '작업 상태',
      },
      retryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'RETRY_COUNT',
        comment: '재시도 횟수',
      },
      totalCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'TOTAL_COUNT',
        comment: '총 데이터 수',
      },
      processedCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'PROCESSED_COUNT',
        comment: '처리 데이터 수',
      },
      offset: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'OFFSET',
        comment: '단위 작업 성공 횟수',
      },
    }, {
      sequelize,
      modelName: 'ScheduleStatus',
      tableName: 'AC_MM_SCHEDULE_STATUS',
      comment: '스케쥴러 상태',
      // underscored: true,
      paranoid: true, // 정책에 따라 soft/hard 결정, 혹시 모르니
      deletedAt: 'REMOVE_DT',
      createdAt: 'INSERT_DT',
      updatedAt: 'UPDATE_DT',
    });
  }
};
