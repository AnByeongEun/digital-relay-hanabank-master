const mongoose = require('mongoose');

const logger = require(global._resolve('/modules/winston')).logger;

const connect = () => {
  if (process.argv.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  // 인증을 위해 보통 admin에 유저를 생성해서 mongodb://user:password@localhost:27017/admin 이런식으로 쓰나?
  // mongodb://[name]:[passwd]localhost:27017/testmongo?authSource=admin
  mongoose.connect('mongodb://localhost:27017/testmongo')
    .then(() => {
      logger.info('Success to Connect MongoDB with Mongoose');
    }).catch(error => {
      logger.warn('Failed to Connect to MongoDB', error);
    });
};

mongoose.connection.on('error', (error) => {
  logger.warn('Failed to Connect to MongoDB', error);
});

mongoose.connection.on('disconnected', (error) => {
  logger.error('Disconnected with MongoDB. Retrying Connection.');
  connect();
});

module.exports = connect;
