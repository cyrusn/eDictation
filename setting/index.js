const process = require('process');
const production = require('../config.json');
const development = require('../config_dev.json');

const config = {production, development};
const env = process.env.NODE_ENV;

module.exports = config[env] || config.development;
