const Joi = require('joi');
const testHandler = require('../handler/test.js').test;

const helperFunc = require('../../helper/func');
const addPrefix = helperFunc.addPrefix;
const enableJWT = helperFunc.enableJWT;

const routes = [
  {
    method: 'POST',
    path: '/edit',
    config: {
      description: 'edit user info',
      tags: ['api', 'user'],
      validate: {
        payload: {
          username: Joi.string().description('username'),
          password: Joi.string().description('password'),
          email: Joi.string().description('email'),
          lastName: Joi.string().description('last name'),
          firstName: Joi.string().description('first Name ')
        }
      }
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/user')).map(enableJWT);
