const winston = require('winston');
require('winston-daily-rotate-file');

function getLogger(module) {

var transport = new (winston.transports.DailyRotateFile)({
  filename: './logs/log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: process.env.ENV === 'development' ? 'debug' : 'error'
});

const logger = winston.createLogger({
  transports: [
    transport
  ]
});
return logger;
}

module.exports = getLogger;