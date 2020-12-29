#! /usr/bin/env node
const logger = require('../lib/logger');
const knex = require('../lib/knex');

if (process.env.APP_ENV === 'production') {
  logger.info('Cannot drop tables in production.');
} else {
  knex.schema
    .raw('DROP SCHEMA public CASCADE')
    .raw('CREATE SCHEMA public')
    .then(() => {
      logger.info('Dropped tables');
      process.exit(0);
    })
    .catch(e => {
      logger.error(e);
      process.exit(1);
    });
}
