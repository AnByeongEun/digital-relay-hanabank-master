const mapper = require('./query-mapper');
const ConnectionPool = require('./oraclePool');
const DatabaseError = require('../../../routes/errors/DatabaseError');

const logger = require(global._resolve('/modules/winston')).logger;

/**
 * 각 Executer는 고유의 Database와 매핑된다
 * 따라서 Executer 마다 pool, mapper 정보를 고정으로 갖는다
 * TODO: DB별로 분리해야 하는지? 일단 오라클, mongo로 가기로 했으니 필요 시 수정
 * (2022.01.03) Oracle에서만 사용한다 (mysql-sequelize, mongo-mongoose)
 */

module.exports = class QueryExecuter {
  constructor(poolAttributes, mapperName, modelName = '') {
    this.mapperName = mapperName;
    poolAttributes.modelName = modelName;
    this.pool = new ConnectionPool(poolAttributes);
  }

  getQuery(queryId, params) {
    const format = { language: 'sql', indent: '  ' };
    // mapper xml 파일명, query id, query parameters, mapper format
    const query = mapper.getStatement(this.mapperName, queryId, params, format);
    return query;
  }

  async exec(queryId, params, isTransaction) {
    let connection = null;
    try {
      connection = await this.pool.connect();
      const query = this.getQuery(queryId, params);
      logger.debug(`>>>>>>>>>> Query [${queryId}] \n${query}`);
      const result = await connection.execute(query);

      if (isTransaction) {
        connection.commit();
      }
      // 이전형식: {records: Array, listSize: Number}
      return result;
    } catch (error) {
      logger.warn(error);
      // throw error;
      throw new DatabaseError(error);
    } finally {
      if (connection) {
        try {
        // Always close connections
          await connection.close();
        } catch (err) {
          console.error(err.message);
          // throw err;
        }
      }
    }
  }

  end(fn) {
    this.pool.end();
  }
};