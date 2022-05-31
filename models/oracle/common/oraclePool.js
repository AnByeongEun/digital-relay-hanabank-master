const oracledb = require('oracledb');
const util = require('util');
const Promise = require('bluebird');

const logger = require(global._resolve('/modules/winston')).logger;

// promise (blubird) 의 최고 장점은 .then 사용가능한 점.
// async 를 sync 처럼 사용할수 있다.
// try catch 가 아닌, function .catch 로 가독성을 간략화 할수 있다.

// 별도 프로세스로 처리할것은 뭐든지 mysql 부분에 선언할수 있다.
Promise.promisifyAll(oracledb);
Promise.promisifyAll(require('oracledb/lib/connection').prototype);
Promise.promisifyAll(require('oracledb/lib/pool').prototype);

const dbConfig = require('../../../config/datasources').oracle;

try {
  oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
  logger.info(`Oracle client Path [${process.env.ORACLE_LIB_PATH}]`);
  oracledb.initOracleClient({ libDir: process.env.ORACLE_LIB_PATH });
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

logger.info(`Oracle client library version number [${oracledb.oracleClientVersion}]`);

// node-oracledb Documentation
// https://oracle.github.io/node-oracledb/doc/api.html

// const DB_INFO = {
//   user     : 'nodevue',
//   password : '!Ami1750100',
//   connectString : "amisvr.iptime.org:1521/xe"
// };

// 왜 class 인가 = singleTone 처리를 해야 함. (Thread self)
// A, B, C 쿼리를 실행했을때.
// A 의 쿼리가 끝난이후, 유휴처리.
// D 쿼리가 요청되었을때, A 의 유휴 커넥션을 재 사용함.
// 물리적인 네트워크 비용이 발생되지 않음.
module.exports = class OraclePool {
  // new 했을때, 실행되는것으로
  // new 생성시 dbinfo 가 없으면 위에 선언된 DB_INFO (AWS RDS) 를 사용
  // dbinfo 가 다른 DB 면 다른 mysql DB 에 접속이 가능함.
  // 커넥션 pool 생성 , 5개 까지 생성하며,
  // class 에서는 member 변수로 .pool 을 잡을수도 없고 "사용하면 안됨".
  constructor(dbinfo) {
    // dbinfo = dbinfo || DB_INFO;
    const poolAttributes = dbinfo || dbConfig;

    // let alias = '';
    // let dbInfo = dbConfig;
    // dbInfo.poolAlias = alias;

    oracledb.fetchAsString = [ oracledb.CLOB ];
    this.attributes = poolAttributes;
    this.pool = oracledb.createPool(poolAttributes);
    logger.info(`Create Database Connection Pool for [${this.attributes.modelName}] : ${this.attributes.connectString}`);
  }

  connect() {
    // .then() 사용 가능.
    // this.pool.getConnectionAsync().then().dispos ... 등
    // return 이 끝나고 process 가 종료되고 나면
    // .disposer 가 실행됨. (connection 을 닫아야 할 시점)
    // 커넥션을 close 하지 않고, .release() 처리함.
    logger.info('Oracle Connect !!! ');
    // return await this.pool.getConnection().disposer(conn => {
    //     return conn.release();
    // });
    // return this.pool.getConnection(DB_INFO);
    // return oracledb.getConnection(DB_INFO);

    return oracledb.getConnection(this.attributes);
  }

  end() {
    logger.debug('Oracle Connection End !!!!');
    // mem 에 상주하는 connection pool 을 해지하는 기능
    // 현 설정 최대 5개의 connection 이 맺어지는데, 이 5개를 모두 close 처리.
    // webServer 가 죽을때, 호출하면 되고,
    // 호출하지 않는다 해도, mainThread 가 죽기 때문에, 자동으로 close 됨.

    console.debug('Oracle thisPoolStatus : ', this.pool.status);

    oracledb.getPool().close(function(err) {
      logger.debug('>>>>>>>>>>>>>>>>>>>>>>>>>>> End of Pool - Error !!');
      if (err) {
        logger.error('ERR pool ending!!');
      }
    });
  }
};
