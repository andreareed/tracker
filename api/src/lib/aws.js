const AWS = require('aws-sdk');
const { region } = require('../../config').aws;

AWS.config.correctClockSkew = true;
AWS.config.update({ region });

module.exports = AWS;
