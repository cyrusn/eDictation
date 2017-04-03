const testHandler = require('../handler/test.js').test;

const helperFunc = require('../../helper/func');
const addPrefix = helperFunc.addPrefix;
const enableJWT = helperFunc.enableJWT;

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'Simple Test API',
      notes: 'Return a decoded jwt token data',
      tags: ['api', 'test'], // ADD THIS TAG
      handler: testHandler
    }
  }
];

module.exports = routes.map(addPrefix('/api/test')).map(enableJWT);
