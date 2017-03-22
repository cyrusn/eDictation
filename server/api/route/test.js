const testHandler = require('../handler/test.js').test;

module.exports = [
  {
    method: 'GET',
    path: '/api/test',
    config: {
      description: 'Simple Test API',
      notes: 'Return a simple JSON with message "Hello World',
      tags: ['api', 'test'], // ADD THIS TAG
      handler: testHandler
    }
  }
];
