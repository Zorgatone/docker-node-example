import winston from 'winston';

export const httpLogger = () => {
  const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: './logs/http-all.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            format: winston.format.simple()
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            format: winston.format.simple()
        })
    ],
    exitOnError: false
  });

  logger.stream = {
    write(message) {
      logger.info(message);
    }
  };

  return logger;
};

export default httpLogger;
