const Joi = require('joi');
const testHandler = require('../handler/test.js').test;

module.exports = [{
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
}, {
  method: 'POST',
  path: '/vocabularies/add',
  config: {
    description: 'add vocabulary to user\'s vocabularies list',
    tags: ['api', 'user', 'vocabulary']
  },
  handler: testHandler
}, {
  method: 'DELETE',
  path: '/vocabularies/{vocabid}/remove',
  config: {
    description: 'remove vocabulary from user\'s vocabularies list',
    tags: ['api', 'user', 'vocabulary']
  },
  handler: testHandler

}];
