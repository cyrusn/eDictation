const Joi = require('joi');
const testHandler = require('../handler/test.js').test;

const helperFunc = require('../../helper/func');
const addPrefix = helperFunc.addPrefix;
const enableJWT = helperFunc.enableJWT;

const routes = [
  {
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
      description: 'remove user from frien list',
      tags: ['api', 'user', 'friend'],
      validate: {
        payload: {
          username: Joi.string().description('remove user by username')
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
          newListName: Joi.string().description('new list name')
        }
      }
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/user/friends')).map(enableJWT);
