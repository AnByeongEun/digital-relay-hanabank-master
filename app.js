const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

global._resolve = require('app-root-path').resolve;
global._env = process.env.NODE_ENV || process.env.npm_lifecycle_event || 'production';
global._configPath = path.resolve(__dirname, 'config', 'config.json');

let envpath = '';
if (process.env.ENV_PATH) {
  envpath = path.resolve(__dirname, process.env.ENV_PATH, `.env.${process.env.NODE_ENV}`);
} else {
  // ENV_PATH 없을 경우 project root의 env 파일 사용
  let filename = '.env.local'; // TODO: .env ??
  if (['production', 'development', 'local'].indexOf(process.env.NODE_ENV) > 0) {
    filename = `.env.${process.env.NODE_ENV}`;
  }
  envpath = path.join(__dirname, filename);
}

dotenv.config({ path: envpath });

const logger = require('./modules/winston').logger;

logger.info(`Use [${envpath}] Environment`);

// 임시 statement, TODO: mongodb로 migration 진행 시 다시 정의
if (process.env.DATABASE_TYPE === 'mongo') {
  const mongo = require('./models/mongo');
  mongo();
}

if (process.env.DATABASE_TYPE === 'mysql') { // ??? TODO: 방식 수정
  require('./models/mysql').mysql();
}

if (process.env.DATABASE_TYPE === 'oracle') { // ??? TODO: 방식 수정
  require('./models/oracle').oracle(); // TODO: temporary, 결정 후 수정
}

var app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add CORS
app.use(cors({
  origin: global._env === 'production' ? require(global._configPath).allowedHttpOrigins : '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  maxAge: 10,
}));

// Routes
app.use('/', require('./routes/index'));
// Relay 2.0 Common
app.use('/api', require('./routes/api'));
// !! 아래는 주석 해제하면 안됨
// app.use('/contact', require('./routes/contact'));
// app.use('/stat', require('./routes/stat')); // Journey 이력 지정
// app.use('/mci', require('./routes/mci')); // mci/mca => Relay 내부에서는 mci로 통칭한다
// app.use('/auth', require('./routes/auth')); // 인증 토큰 발급
// app.use('/view', require('./routes/view')); // TODO: naming
// Test
app.use('/test', require('./routes/test'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.warn('404 Error Exception');
  res.status(404).send();
  // next(createError(404));
});

// Error Handler
app.use(require('./routes/errors/error-handler'));

// Scheduler
if (require('./config/scheduler').isActive) {
  const scheduler = new (require('./modules/batch/DatabaseMigratingScheduler'))('DatabaseMigration');
  scheduler.startJob();
}

// run Server 3001 port
app.listen(process.env.HTTP_PORT, function() {
  logger.info(`Express's started on port ${process.env.HTTP_PORT}`);
});

if (process.env.TCP_SERVER_ACTIVE === 'true') {
  const tcpServer = new (require('./modules/TcpServer'))({ port: process.env.TCP_SERVER_PORT });
  tcpServer.initServer();
}
