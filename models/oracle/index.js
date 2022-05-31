const fs = require('fs');
const path = require('path');
const typeorm = require('typeorm');
const basename = path.basename(__filename);
const config = require(global._resolve('/config/datasources')).oracle;
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

const db = {};

const entityDirectoryName = 'schema';

const oracle = () => {
  const entities = fs.readdirSync(`${__dirname}/${entityDirectoryName}`)
    .filter(name => {
      return name !== basename;
    })
    .map(file => {
      const name = file.split('.')[0];
      const entity = require(path.join(__dirname, entityDirectoryName, name));
      db[name] = entity; // 어디에 쓸진 모르지만 일단 넣어보자
      return entity;
      // model.init(sequelize);
      // logger.info(`Initialize sequelize [${name}]`);
    });

  try {
    // https://typeorm.io/#/connection-options/mysql--mariadb-connection-options
    typeorm.createConnection({
      ...config,
      charset: 'utf8',
      entities: entities,
      namingStrategy: new SnakeNamingStrategy(),
      // debug: true,
      synchronize: false, // entity객체와 테이블 sync를 맞추지 않음, 문제가 있을 경우 runtime시 에러 발생
      dropSchema: false,
      logging: true,
    });
  } catch (error) {
    console.error(error);
  }
};

db.oracle = oracle;

module.exports = db;
