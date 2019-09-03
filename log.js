'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

var date = new Date();
var dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getHours()}Hour_${date.getMinutes()}Min_${date.getSeconds()}sec`

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
        ), 

  transports: [
    
    new (winston.transports.Console)({
      colorize: true,
      level: 'debug'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/info_${dateFormat}.log`,
      level: 'debug'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/error_${dateFormat}.log`,
      level: 'error'
    })
  ]
});

global.logger = logger;
