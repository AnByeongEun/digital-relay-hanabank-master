const CustomError = require('../../messages/error/CustomError');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = (err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  // TODO: sequelize error 처리 ??
  // TODO: 정의된 모든 Error Type 들 추가 필요
  if (err instanceof SyntaxError) {
    return res.status(err.status).json({
      code: 123, // TODO: 수정
      message: err.message,
    });
  }

  // custom error들은 여기 타도록
  if (err instanceof CustomError) {
    return res.status(err.status).json(err.getResponse());
  }

  // if (err instanceof Sequelize.ValidationError) {
  //   return res.status(err.status).json(err.getResponse());
  // }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);

  // Unknown Error 처리 필요
  return res.status(err.status).json({
    code: 999,
    message: err.message,
  });
};