const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const addPrefix = require('../../helper/func').addPrefix;

const routes = [
  {
    method: 'POST',
    path: '/create',
    config: {
      description: 'create the list of id of vocabularies for front end to create a quiz',
      notes: 'backend only provide the list of vocabulary id, frontend will manange the logic part of quiz ',
      tags: ['api', 'quiz'],
      validate: {
        query: {
          level: Joi.number().integer().min(0).max(6).default(0), // 0 means include all levels
          limit: Joi.number().integer().default(0),
          random: Joi.boolean()
        }
      },
      response: {
        schema: Joi.object({
          id: Joi.string(),
          vocabularies: Joi.array()
        })
      }
    },

    handler: testHandler
  }, {
    method: 'POST',
    path: '/check/{vocab_id}',
    config: {
      description: 'check ans for a vocabulary',
      tags: ['api', 'quiz'] // ADD THIS TAG
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/save',
    config: {
      description: 'save the result of the quiz',
      tags: ['api', 'quiz'] // ADD THIS TAG
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/quiz'));
