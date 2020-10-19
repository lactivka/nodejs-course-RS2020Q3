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
    filename: 'logs/info.log',
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

const logInfo = (req, res) => {
  logger.info(
    `${req.method} ${res.statusCode} ${req.url} query: ${JSON.stringify(
      req.params
    )} body: ${JSON.stringify(req.body)}`
  );
};

const logError = (req, res, err, logMessage) => {
  console.log('err message', err, logMessage);
  const log = logMessage
    ? logMessage
    : `${req.method} ${res.statusCode} ${req.url} query: ${JSON.stringify(
        req.params
      )} body: ${JSON.stringify(req.body)} response: ${err.message}`;
  logger.error(log);
};

// logger.finish = exitCode => {
//   transport.on('finish', () => process.exit(exitCode));
//   transport.close();
// };

module.exports = { logger, logInfo, logError };
