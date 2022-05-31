module.exports = {
  logPath: process.env.LOG_PATH,
  consoleLogLevel: process.env.LOG_CONSOLE_LEVEL,
  systemLog: {
    name: process.env.LOG_DEBUG_NAME,
    level: process.env.LOG_DEBUG_LEVEL,
    datePattern: process.env.LOG_DATE_PATTERN,
    zippedArchive: Boolean(process.env.LOG_ZIP_ARCHIVE),
    maxSize: Number(process.env.LOG_DEBUG_MAX_SIZE) * 1024 ** 2,
    maxFiles: Number(process.env.LOG_DEBUG_MAX_FILES),
  },
  apiTrace: {
    name: process.env.LOG_API_NAME,
    level: process.env.LOG_API_LEVEL,
    datePattern: process.env.LOG_DATE_PATTERN,
    zippedArchive: Boolean(process.env.LOG_ZIP_ARCHIVE),
    maxSize: Number(process.env.LOG_API_MAX_SIZE) * 1024 ** 2,
    maxFiles: Number(process.env.LOG_API_MAX_FILES),
  },
  interfaceTrace: {
    name: process.env.LOG_INTERFACE_NAME,
    level: process.env.LOG_INTERFACE_LEVEL,
    datePattern: process.env.LOG_DATE_PATTERN,
    zippedArchive: Boolean(process.env.LOG_ZIP_ARCHIVE),
    maxSize: Number(process.env.LOG_INTERFACE_MAX_SIZE) * 1024 ** 2,
    maxFiles: Number(process.env.LOG_INTERFACE_MAX_FILES),
  },
};