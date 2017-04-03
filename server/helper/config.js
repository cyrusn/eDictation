const process = require('process');
const production = require('../config');
const development = require('../config_dev');

const config = {production, development};

module.exports = function get () {
  const env = process.env.NODE_ENV;
  const result = config[env] || config.development;
  return result;
};
