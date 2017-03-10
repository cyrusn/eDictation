var testHandlers = require('./handler/test.js').test;

module.exports = [
  {
    method: 'GET',
    path: '/api/test',
    handler: testHandlers
  }, {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  }
// login
// logout
// import user
// import vocabulary
// save test result
];
