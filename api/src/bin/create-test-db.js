#! /usr/bin/env node
const logger = require('../lib/logger');
const knex = require('../lib/knex');

knex.schema
  .raw(`CREATE DATABASE database_test`)
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    if (error.message.indexOf('already exists') > -1) {
      process.exit(0);
    }
    logger.error(error);
    process.exit(1);
  });
