// utils/logger.js
const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create log file streams
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logDir, 'error.log'), { flags: 'a' });
const warningLogStream = fs.createWriteStream(path.join(logDir, 'warning.log'), { flags: 'a' });

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'warning.log'), level: 'warn' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

module.exports = { logger, accessLogStream };
