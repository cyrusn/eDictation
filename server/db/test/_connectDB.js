/* global describe before */
// connect to db

const logger = require('../../helper/logger');
require('../connect')(() => {
  logger.info('connected to DB');
});
