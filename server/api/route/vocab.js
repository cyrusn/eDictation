const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const vocabHandler = require('../handler/vocab');

const helperFunc = require('../../helper/func');

const addPrefix = helperFunc.addPrefix;
const enableJWT = helperFunc.enableJWT;

const definationSchema = [{
  partOfSpeech: Joi.string(),
  eng: Joi.string(),
  chi: Joi.string(),
  examples: [{
    text: Joi.string(),
    translation: Joi.string()
  }]
}];

const vocabSchema = Joi.object({
  id: Joi.string(),
  creator: Joi.string(),
  title: Joi.string(),
  tag: [Joi.string()],
  level: Joi.number().min(1).max(5), // level range from 1 to 5
  phonetic: Joi.string(),
  definations: [definationSchema]
});

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'Get vocabularies',
      notes: 'return an array of vocabulary object',
      tags: ['api', 'vocabulary'],
      validate: {
        query: {
          level: Joi.number().integer().min(0).max(6).default(0), // 0 means include all levels
          page: Joi.number().integer(),
          limit: Joi.number().integer(),
          tag: Joi.string(),
          search: Joi.string()
        }
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
    handler: vocabHandler.add
  }, {
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
    method: 'PUT',
    path: '/{vocabid}/edit',
    config: {
      description: 'edit existing vocabulary in database',
      tags: ['api', 'vocabulary'],
      validate: {
        params: {
          vocabid: Joi.string()
        }
      }

    },
    handler: testHandler
  }, {
    method: 'DELETE',
    path: '/{vocabid}/delete',
    config: {
      description: 'delete existing vocabulary in database',
      tags: ['api', 'vocabulary']
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/share',
    config: {
      description: 'share vocabularies to users',
      tags: ['api', 'vocabulary'],
      validate: {
        payload: {
          vocabs: Joi.array().items(Joi.string().description('array of vocabulary id')),
          users: Joi.array().items(Joi.string().description('array of user id'))
        }
      }
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/vocabularies')).map(enableJWT);
