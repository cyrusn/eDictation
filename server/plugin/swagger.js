const Swagger = require('hapi-swagger');
const Pack = require('../../package.json');

const options = {
  info: {
    'title': 'eDictation API Documentation',
    'version': Pack.version
  },
  basePath: '/',
  pathPrefixSize: 2
};

module.exports = {
  'register': Swagger,
  'options': options
};
