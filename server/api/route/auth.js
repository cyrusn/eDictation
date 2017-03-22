const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const addPrefix = require('../../helper/func').addPrefix;

const routes = [
  {
    method: 'POST',
    path: '/login',
    config: {
      description: 'Sign for JWT token',
      tags: ['api', 'auth'], // ADD THIS TAG
      validate: {
        params: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/refresh',
    config: {
      description: 'Refresh JWT token',
      tags: ['api', 'auth'] // ADD THIS TAG
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/auth'));
