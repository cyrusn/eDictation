const Joi = require('joi');
const authHandler = require('../handler/auth.js');

module.exports = [{
  method: 'POST',
  path: '/sign',
  config: {
    description: 'unregister user',
    tags: ['api', 'auth'],
    validate: {
      payload: {
        alias: Joi.string().required().description('username or email'),
        password: Joi.string().required().description('password')
      }
    }
  },
  handler: authHandler.sign
}, {
  method: 'GET',
  path: '/refresh',
  config: {
    auth: 'jwt',
    description: 'Refresh JWT token',
    tags: ['api', 'auth'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
      }).description('jwt token in header').unknown()
    }
  },
  handler: authHandler.refresh
}, {
  method: 'POST',
  path: '/register',
  config: {
    description: 'register user',
    tags: ['api', 'auth'],
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
  method: 'DELETE',
  path: '/unregister',
  config: {
    description: 'unregister user',
    tags: ['api', 'auth'],
    auth: 'jwt',
    validate: {
      payload: {
        alias: Joi.string().required().description('username or email'),
        password: Joi.string().required().description('password')
      },
      headers: Joi.object({
        authorization: Joi.string()
      }).description('jwt token in header').unknown()
    }
  },
  handler: authHandler.unregister
}];
