const Joi = require('joi');
const testHandler = require('../handler/test.js').test;

const routes = [{
  method: 'POST',
  path: '/add',
  config: {
    description: 'add user to user list',
    tags: ['api', 'user', 'friend'],
    validate: {
      payload: {
        username: Joi.string().description('remove user by username')
      }
    }
  },
  handler: testHandler
}, {
  method: 'DELETE',
  path: '/{listName}/delete',
  config: {
    description: 'remove user from friend list',
    tags: ['api', 'user', 'friend'],
    validate: {
      payload: {
        usernames: Joi.array().items(Joi.string()).description('remove users by username')
      }
    }
  },
  handler: testHandler
}, {
  method: 'PUT',
  path: '/{listName}/move',
  config: {
    description: 'move user from listName to newListName',
    tags: ['api', 'user', 'friend'],
    validate: {
      payload: {
        usernames: Joi.array().items(Joi.string()).description('move users to new friend list'),
        newListName: Joi.string().description('new list name')
      }
    }
  },
  handler: testHandler
}];

module.exports = routes;
