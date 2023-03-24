import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LOG_DATE_PATTERN, LOG_DIRNAME, LOG_DISABLE_STDOUT, LOG_ENABLE_SAVE_FILE, LOG_MAX_FILES, LOG_MAX_SIZE, LOG_ZIPPED_ARCHIVE, SERVICE_NAME } from '../../config/constants';


const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry: any) => {
  const { service, level, message, ...rest } = logEntry;

  // eslint-disable-next-line no-param-reassign
  logEntry[MESSAGE] = JSON.stringify({
    timestamp: new Date(),
    service,
    level,
    message,
    ...rest,
  });

  return logEntry;
};

const transports: winston.transport[] = [];

if (!LOG_DISABLE_STDOUT) {
  const transportStdoutConfig = new winston.transports.Console({});
  transports.push(transportStdoutConfig);
}

if (LOG_ENABLE_SAVE_FILE) {
  const transportRotateFileConfig: DailyRotateFile = new DailyRotateFile({
    filename: `${SERVICE_NAME}-%DATE%.log`,
    dirname: LOG_DIRNAME,
    datePattern: LOG_DATE_PATTERN,
    zippedArchive: LOG_ZIPPED_ARCHIVE,
    maxSize: LOG_MAX_SIZE,
    maxFiles: LOG_MAX_FILES,
  });
  transports.push(transportRotateFileConfig);
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format(jsonFormatter)(),
  defaultMeta: { service: SERVICE_NAME },
  transports,
});
