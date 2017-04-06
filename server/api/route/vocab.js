const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const vocabHandler = require('../handler/vocab');

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
  title: Joi.string(),
  tag: [Joi.string()],
  level: Joi.number().min(1).max(5), // level range from 1 to 5
  phonetic: Joi.string(),
  definations: Joi.array().items(definationSchema)
});

module.exports = [{
  method: 'GET',
  path: '/search',
  config: {
    description: 'search vocabularies in database',
    notes: 'return an array of vocabulary object',
    tags: ['api', 'vocabulary'],
    validate: {
      query: {
        level: Joi.number().integer().min(0).max(6).default(0), // 0 means include all levels
        page: Joi.number().integer().default(1),
        limit: Joi.number().integer().default(30),
        tags: Joi.array().items(Joi.string()),
        search: Joi.string()
      }
    }
  },
  handler: vocabHandler.search
}, {
  method: 'POST',
  path: '/add',
  config: {
    description: 'Add vocabulary to database',
    notes: `vocabulary added to database will automatically be added to user's vocabularies list`,
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
    description: 'import vocabularies to database',
    notes: `vocabularies imported to database will automatically be added to user's vocabularies list`,
    tags: ['api', 'vocabulary'],
    validate: {
      payload: Joi.array().items(vocabSchema)
    }
  },
  handler: vocabHandler.import
}, {
  method: 'PUT',
  path: '/{vocabid}/edit',
  config: {
    description: 'edit vocabulary in database',
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
    description: 'delete vocabulary in database',
    tags: ['api', 'vocabulary']
  },
  handler: testHandler
}];
