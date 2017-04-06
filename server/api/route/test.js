const testHandler = require('../handler/test.js').test;

module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    description: 'Simple Test API',
    notes: 'Return a decoded jwt token data',
    tags: ['api', 'test'],
    handler: testHandler
  }
}];
