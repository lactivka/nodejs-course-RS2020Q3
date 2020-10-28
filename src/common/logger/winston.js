const winston = require('winston');

require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
});

// timezone function winston calls to get timezone(Europe/Kiev)

const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Kiev'
  });

const colors = {
  info: 'bold cyan',
  message: 'blue'
};

winston.addColors(colors);

// options for logger object
const options = {
  file: {
    level: 'info',
    filename: 'logs/appLogs.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: timezoned
      }),
      winston.format.printf(
        info => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    )
  },
  errorFile: {
    level: 'error',
    filename: 'logs/errors.log',
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: timezoned
      }),
      winston.format.printf(
        info => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    handleRejections: true,
    json: false,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp({
        format: timezoned
      }),
      winston.format.printf(
        info => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    )
  }
};

// logger object with above defined options
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
    transport
  ],
  exitOnError: false
});

// writing file
logger.stream = {
  write(message) {
    logger.info(message);
  }
};

const getInfo = (req, res, err) =>
  `${req.method} ${res.statusCode} ${req.protocol}://${req.get('host')}${
    req.originalUrl
  } query: ${JSON.stringify(req.query)} body: ${JSON.stringify(req.body)} ${
    err ? `message: ${err.message}` : ''
  }`;

const logInfo = (req, res, next) => {
  logger.info(getInfo(req, res));
  next();
};

const logError = (req, res, err, logMessage) => {
  const log = logMessage ? logMessage : getInfo(req, res, err);
  logger.error(log);
};

logger.finish = exitCode => {
  // eslint-disable-next-line no-process-exit
  transport.on('finish', () => process.exit(exitCode));
  transport.close();
};

module.exports = { logger, logInfo, logError };
