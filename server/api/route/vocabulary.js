const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const addPrefix = require('../../helper/func').addPrefix;

const routes = [
  {
    method: 'POST',
    path: '/add',
    config: {
      description: 'Add vocabulary to database',
      tags: ['api', 'vocabulary'] // ADD THIS TAG
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/edit',
    config: {
      description: 'edit existing vocabulary in database',
      tags: ['api', 'vocabulary'] // ADD THIS TAG
    },
    handler: testHandler
  }, {
    method: 'DELETE',
    path: '/delete',
    config: {
      description: 'delete existing vocabulary in database',
      tags: ['api', 'vocabulary'] // ADD THIS TAG
    },
    handler: testHandler
  }, {
    method: 'GET',
    path: '',
    config: {
      description: 'Get vocabularies',
      notes: 'return an array of vocabulary object',
      tags: ['api', 'vocabulary'], // ADD THIS TAG
      validate: {
        query: {
          level: Joi.number().integer().min(0).max(6).default(0), // 0 means include all levels
          limit: Joi.number().integer().default(30),
          random: Joi.boolean()
        }
      }
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/vocabulary'));
