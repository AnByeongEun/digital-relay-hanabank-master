exports.oracle = {
  type: 'oracle',
  host: process.env.ORACLE_HOST,
  port: process.env.ORACLE_PORT,
  username: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  database: process.env.ORACLE_DATABASE,
  sid: process.env.ORACLE_DATABASE,
  skip: true,
  synchronize: false,
  entities: [
    'models/oracle/schema/**/*.ts',
  ],
  logging: [
    'error',
  ],
  extra: {
    connectionLimit: parseInt(process.env.ORACLE_MAX_POOL) || 5,
  },
};

// 사용하는 코드
const logger = require(global._resolve('/modules/winston')).logger;
const AES256 = require('../routes/middlewares/AES256');

exports.mysql = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  password: AES256.decrypt(process.env.MYSQL_PASSWORD),
  database: process.env.MYSQL_DATABASE,
  dialect: 'mysql',
  timezone: '+09:00',
  logging: process.env.MYSQL_LOGGING === 'true' ? console.log : false, // 개발시에만 console.log로 설정 (true는 deprecated)
  // logging: process.env.NODE_ENV === 'local' ? console.log : false, // 개발시에만 console.log로 설정 (true는 deprecated)
  // logging: logger.info.bind(logger), // customizing해서 winston과 binding 할 수 있음
  // operatorsAliases: false,
  pool: {
    max: parseInt(process.env.MYSQL_MAX_POOL) || 5,
    // min: 2,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle
  },
  // logging: true / false
  // **** old
  // multipleStatements: true,
  // connectionLimit: 5,
  // waitForConnections: false,
};