const process = require('process');
const production = require('../config');

const config = {
  production,
  default: {
    'db': {
      'name': 'test'
    },
    'public': {
      'path': '../public'
    },
    'log': {
      'name': 'eDictation.log',
      'path': '../log'
    },
    'server': {
      'host': 'localhost',
      'port': '5000'
    },
    'jwt': {
      'key': 'whip-behind-precept-oxymoron-uvula-needful-bribery',
      'exp': '30m',
      'algorithm': 'HS256'
    }
  }
};

exports.get = function get () {
  const env = process.env.NODE_ENV;
  return config[env] || config.default;
};
