import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import getEnvironmentVariables from './environmentalVariables';

const env = getEnvironmentVariables();

const infoTransport = new DailyRotateFile({
  filename: `${env.LOG_FOLDER_INFO}/%DATE%-info.log`,
  datePattern: env.DATE_PATTERN,
  zippedArchive: env.ZIPPED_ARCHIVE,
  maxSize: env.MAX_SIZE,
  maxFiles: env.MAX_FILES,
  level: 'info',
});

const errorTransport = new DailyRotateFile({
  filename: `${env.LOG_FOLDER_ERROR}/%DATE%-error.log`,
  datePattern: env.DATE_PATTERN,
  zippedArchive: env.ZIPPED_ARCHIVE,
  maxSize: env.MAX_SIZE,
  maxFiles: env.MAX_FILES,
  level: 'error',
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.simple(),
});

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    infoTransport,
    errorTransport,
    consoleTransport,
  ],
});

export default logger;
