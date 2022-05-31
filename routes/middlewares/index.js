// initialization 시 필요한 항목들은 programmatic(readdirSync) 하게 정의하면 안됨 (외부에서 사용할 때 export 객체 할당 안될 수 있음)
module.exports.checkAuth = require('./check-auth');
module.exports.validateRequest = require('./validate-request'); // https://github.com/eivindfjeldstad/validate
module.exports.validate = require('./validate');
module.exports.validator = require('./validator'); // https://github.com/sideway/joi