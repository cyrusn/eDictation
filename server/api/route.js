// const Joi = require('joi');

var testHandlers = require('./handler/test.js').test;

module.exports = [
  {
    method: 'GET',
    path: '/api/test',
    config: {
      description: 'Simple Test API',
      notes: 'Return a simple JSON with message "Hello World',
      tags: ['api'], // ADD THIS TAG
      handler: testHandlers
    }
  }, {
    method: 'GET',
    path: '/{param*}',
    config: {
      description: 'Serve Public Folder',
      tags: ['api'], // ADD THIS TAG
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      }
    }
  }
// login
// logout
// import user
// import vocabulary
// save test result
];
