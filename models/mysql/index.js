const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(global._resolve('/config/datasources')).mysql;

const logger = require(global._resolve('/modules/winston')).logger;

const db = {};

// sequelize.close()

let sequelize;

// config/datasources.js 파일에 있는 정보를 가져와 sequelize 객체를 생성한다.
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const isMultiModal = (name) => {
  // TODO: Admin 필요시 추가
  return name.indexOf('Hana') > -1 || name.startsWith('Schedule');
};

db.models = {};
// index.js가 있는 디렉토리에서 index.js를 제외한 나머지 파일들을 db 객체에 넣는다
fs.readdirSync(`${__dirname}/schema`)
  .filter(name => {
    return name !== basename && isMultiModal(name);
    // return name !== basename;
  })
  .forEach(file => {
    const name = file.split('.')[0];
    const model = require(path.join(__dirname, 'schema', name));
    model.init(sequelize);
    logger.info(`Initialize sequelize [${name}]`);
    db.models[name] = model; // assicoate할때 사용
  });

// Table Relation 적용
Object.keys(db.models).forEach(modelName => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// mysql sequelize 구동
db.mysql = async () => {
  try {
    // force: true => drop & create
    // alter: true => validate ?? 테이블과 모델의 상태를 비교하여 현재 모델의 형태로 Table Schema를 변경
    sequelize.sync({ force: false })
      .then(() => {
        logger.info('Success to Connect MariaDB with Sequelize');
      })
      .catch((err) => {
        logger.warn(err);
      });
  } catch (error) {
    logger.warn(error);
    throw error; // TODO: 처리 필요
  }
};

module.exports = db;

/*
# Table drop 방식
await User.drop();
logger.debug("User table dropped!");
await sequelize.drop();
logger.debug("All tables dropped!");
*/
