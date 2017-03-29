const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const addPrefix = require('../../helper/func').addPrefix;

const definationSchema = Joi.array().items({
  lexicalCategory: Joi.string(),
  eng: Joi.string(),
  chi: Joi.string(),
  examples: Joi.array().items({
    text: Joi.string(),
    translation: Joi.string()
  })
});

const vocabSchema = Joi.object({
  word: Joi.string(),
  phonetic: Joi.string(),
  definations: Joi.array().items(definationSchema)
});

const routes = [
  {
    method: 'POST',
    path: '/import',
    config: {
      description: 'import vocabularies for users',
      tags: ['api', 'vocabulary'],
      validate: {
        payload: vocabSchema
      }
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/add',
    config: {
      description: 'Add vocabulary to database',
      tags: ['api', 'vocabulary'],
      validate: {
        payload: vocabSchema
      }
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/edit',
    config: {
      description: 'edit existing vocabulary in database',
      tags: ['api', 'vocabulary']
    },
    handler: testHandler
  }, {
    method: 'DELETE',
    path: '/delete',
    config: {
      description: 'delete existing vocabulary in database',
      tags: ['api', 'vocabulary']
    },
    handler: testHandler
  }, {
    method: 'GET',
    path: '',
    config: {
      description: 'Get vocabularies',
      notes: 'return an array of vocabulary object',
      tags: ['api', 'vocabulary'],
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
