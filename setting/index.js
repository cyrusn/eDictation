const process = require('process');
const production = require('../config.json');
const development = require('./dev.json');

const config = {production, development};

module.exports = function get () {
  const env = process.env.NODE_ENV;
  const result = config[env] || config.development;
  return result;
};
