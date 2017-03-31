const testHandler = require('../handler/test.js').test;
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/test',
    config: {
      auth: 'jwt',
      description: 'Simple Test API',
      notes: 'Return a simple JSON with message "Hello World',
      tags: ['api', 'test'], // ADD THIS TAG
      handler: testHandler,
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
];
