const winston = require('winston');
const { env } = require('../../config');

module.exports = new winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'development' ? 'debug' : 'info',
      format: winston.format.simple(),
    }),
  ],
  filters: [
    (level, msg, meta) => msg.trim(),
    (leve, msg, meta) => msg.replace(/"token":".*"/, '"token":"TOKEN"'), //don't add access tokens to the logs
  ],
});
