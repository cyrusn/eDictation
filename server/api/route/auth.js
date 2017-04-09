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
        username: Joi.string().required().description('username'),
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
    tags: ['api', 'auth']
  },
  handler: authHandler.refresh
}];
