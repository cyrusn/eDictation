const process = require('process');
const production = require('../config');
const Pack = require('../package');

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
    },
    swaggerOption: {
      info: {
        'title': 'eDictation API Documentation',
        'version': Pack.version
      },
      basePath: '/api',
      pathPrefixSize: 2
    }
  }
};

exports.get = function get () {
  const env = process.env.NODE_ENV;
  return config[env] || config.default;
};
