const mapper = require('mybatis-mapper');
const path = require('path');

const mapperPath = path.join(__dirname, '..', 'mapper');

mapper.createMapper([
  `${mapperPath}/oracleApiMapper.xml`,
  `${mapperPath}/sbiErsOracleApiMapper.xml`,
]);

module.exports = mapper;