const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { timestamp, printf, colorize } = winston.format;

const logConfig = require('../config/logging');
const { logPath, consoleLogLevel } = logConfig;
const systemLogOptions = logConfig.systemLog;
const apiTraceOptions = logConfig.apiTrace;
const interfaceTraceOptions = logConfig.interfaceTrace;
const journeyTraceOptions = logConfig.journeyTrace;

const processName = process.env.PROCESS_NAME.toLowerCase();

/*
 * Log Level
 * 0 error, 1 warn, 2 info, 3 http, 4 verbose, 5 debug, 6 silly
 * (info 설정 하면 info 아래 error, warn, info 까지만 노출)
 */
const systemLogDailyRotateFileTransport = new DailyRotateFile({
  level: systemLogOptions.level,
  filename: `${logPath}/debug/LOG_AICC_MM_RELAY_%DATE%.log`,
  datePattern: systemLogOptions.datePattern, // 파일명에 포함될 날짜 형식
  zippedArchive: systemLogOptions.zippedArchive,
  maxSize: systemLogOptions.maxSize, // 100 MB = 1024 * 1024 * 100 = 104857600 Bytes
  maxFiles: systemLogOptions.maxFiles, // 보관할 최대 파일 수
});

const apiTraceDailyRotateFileTransport = new DailyRotateFile({
  level: apiTraceOptions.logLevel,
  filename: `${logPath}/api/LOG_AICC_MM_RELAY_%DATE%.log`,
  datePattern: apiTraceOptions.datePattern,
  zippedArchive: apiTraceOptions.zippedArchive,
  maxSize: apiTraceOptions.maxSize,
  maxFiles: apiTraceOptions.maxFiles,
});

const interfaceDailyRotateFileTransport = new DailyRotateFile({
  level: interfaceTraceOptions.logLevel,
  filename: `${logPath}/interface/LOG_MM_RELAY_%DATE%.log`,
  datePattern: interfaceTraceOptions.datePattern,
  zippedArchive: interfaceTraceOptions.zippedArchive,
  maxSize: interfaceTraceOptions.maxSize,
  maxFiles: interfaceTraceOptions.maxFiles,
});

const journeyDailyRotateFileTransport = new DailyRotateFile({
  level: journeyTraceOptions.logLevel,
  filename: `${logPath}/journey/LOG_MM_RELAY_%DATE%.log`,
  datePattern: journeyTraceOptions.datePattern,
  zippedArchive: journeyTraceOptions.zippedArchive,
  maxSize: journeyTraceOptions.maxSize,
  maxFiles: journeyTraceOptions.maxFiles,
});

const errorStackFormat = winston.format(info => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

// Define Log formats (log별로 다른 옵션 사용해야 하면 분리)
const logFormat = winston.format.combine(
  winston.format.splat(), // interpolation을 굳이 얘로 해야함?
  errorStackFormat(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  printf(info => `${info.timestamp} ${info.level.toUpperCase().padEnd(5, ' ')} ${info.message}`),
);

const traceFormat = winston.format.combine(
  winston.format.splat(), // interpolation을 굳이 얘로 해야함?
  errorStackFormat(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  printf(info => `${info.timestamp} ${info.message}`),
);

const journeyFormat = winston.format.combine(
  winston.format.splat(), // interpolation을 굳이 얘로 해야함?
  errorStackFormat(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  printf(info => `${info.message}`),
);

const logger = new winston.createLogger({
  transports: [
    systemLogDailyRotateFileTransport,
  ],
  format: logFormat,
  exitOnError: false,
});

const api = new winston.createLogger({
  transports: [
    apiTraceDailyRotateFileTransport,
  ],
  format: traceFormat,
  exitOnError: false,
});

const interface = new winston.createLogger({
  transports: [
    interfaceDailyRotateFileTransport,
  ],
  format: traceFormat,
  exitOnError: false,
});

const journeyLogger = new winston.createLogger({
  transports: [
    journeyDailyRotateFileTransport,
  ],
  format: traceFormat,
  exitOnError: false,
});

// Production 환경이 아닌 경우 Console에 로그 출력
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: consoleLogLevel,
    format: winston.format.combine(
      logFormat,
      // winston.format.colorize(),
      // winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    ),
  }));

  api.add(new winston.transports.Console({
    level: consoleLogLevel,
    format: winston.format.combine(
      traceFormat,
    ),
  }));

  interface.add(new winston.transports.Console({
    level: consoleLogLevel,
    format: winston.format.combine(
      traceFormat,
    ),
  }));

  journeyLogger.add(new winston.transports.Console({
    level: consoleLogLevel,
    format: winston.format.combine(
      journeyFormat,
    ),
  }));
}

module.exports.logger = logger;

/**
 * ApiTrace Message Format
 * HTTP => [method] [url] [:elapsed_time] [:status]
 * TCP  => [messageType] [key] [:elapsed_time] [:status]
 */
module.exports.apiTrace = {
  // TODO: remote(client) address 필요?
  req(transactionId, protocol, resourceName, message) {
    const trace = `[REQ][${protocol}][${resourceName}][${transactionId}] ${message}`;
    api.info(trace);
  },
  res(transactionId, protocol, resourceName, message, elapsed, status) {
    const trace = `[RES][${protocol}][${resourceName}][${transactionId}] ${message} ${elapsed}ms ${status}`;
    api.info(trace);
  },
};

/**
 * InterfaceTrace Message Format
 * HTTP => [method] [url] [:elapsed_time] [:status]
 * TCP  => [messageType] [key] [:elapsed_time] [:status]
 */
module.exports.interfaceTrace = {
  req(target, type, host, transactionId, message) {
    const trace = `[REQ][${target}][${type}][${host}][${transactionId}] ${message}`;
    interface.info(trace);
  },
  res(target, type, host, transactionId, message, elapsed, status) {
    const trace = `[RES][${target}][${type}][${host}][${transactionId}] ${message} ${elapsed}ms ${status}`;
    interface.info(trace);
  },
};

module.exports.journeyLogger = journeyLogger;