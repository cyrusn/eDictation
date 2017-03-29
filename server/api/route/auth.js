const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const authHandler = require('../handler/auth.js');
const addPrefix = require('../../helper/func').addPrefix;

const routes = [{
  method: 'POST',
  path: '/unregister',
  config: {
    description: 'unregister user',
    tags: ['api', 'auth'], // ADD THIS TAG
    validate: {
      payload: {
        username: Joi.string().required().description('username'),
        password: Joi.string().required().description('password')
      }
    }
  },
  handler: authHandler.unregister
}, {
  method: 'POST',
  path: '/register',
  config: {
    description: 'register user',
    tags: ['api', 'auth'], // ADD THIS TAG
    validate: {
      payload: {
        username: Joi.string().required().description('username'),
        password: Joi.string().required().description('password'),
        firstName: Joi.string().required().description('first name'),
        lastName: Joi.string().required().description('last name'),
        email: Joi.string().required().description('email address')
      }
    }
  },
  handler: authHandler.register
}, {
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
