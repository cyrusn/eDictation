const testHandler = require('../handler/test.js').test;
const Joi = require('joi');

module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    // auth: {
    //   strategy: 'jwt',
    //   scope: ['admin', 'teacher', 'student']
    // },
    description: 'Simple Test API',
    notes: 'Return a decoded jwt token data',
    tags: ['api', 'test'],
    validate: {
      // headers: Joi.object({
      //   authorization: Joi.string().required()
      // }).unknown()
    },
    handler: testHandler
  }
}];
