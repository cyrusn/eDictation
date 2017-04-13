const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const vocabHandler = require('../handler/vocab');

const vocabSchema = Joi.object({
  title: Joi.string(),
  phonetic: Joi.string(),
  definations: Joi.array().items({
    partOfSpeeches: Joi.array().items(Joi.string()),
    translations: Joi.array().items(Joi.string()),
    examples: Joi.array().items(Joi.string())
  }),
  level: Joi.number().min(1).max(5) // level range from 1 to 5
});

module.exports = [{
  method: 'GET',
  path: '/search',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['teacher', 'admin']
    },
    description: 'search vocabularies in database',
    notes: 'return an array of vocabulary object',
    tags: ['api', 'vocabulary'],
    validate: {
      query: {
        levels: Joi.array().items(Joi.number().integer().min(1).max(5)),
        page: Joi.number().integer().default(1),
        limit: Joi.number().integer().default(30),
        search: Joi.string()
      },
      headers: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }
  },
  handler: vocabHandler.search
}, {
  method: 'POST',
  path: '/add',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['teacher', 'admin']
    },
    description: 'Add vocabulary to database',
    notes: `vocabulary added to database will automatically be added to user's vocabularies list`,
    tags: ['api', 'vocabulary'],
    validate: {
      payload: vocabSchema,
      headers: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }
  },
  handler: vocabHandler.add
}, {
  method: 'POST',
  path: '/import',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['teacher', 'admin']
    },
    description: 'import vocabularies to database',
    notes: `vocabularies imported to database will automatically be added to user's vocabularies list`,
    tags: ['api', 'vocabulary'],
    validate: {
      payload: Joi.array().items(vocabSchema),
      headers: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }
  },
  handler: vocabHandler.import
}, {
  method: 'PUT',
  path: '/{vocabid}/edit',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['teacher', 'admin']
    },
    description: 'edit vocabulary in database',
    tags: ['api', 'vocabulary'],
    validate: {
      params: {
        vocabid: Joi.string().required()
      },
      payload: vocabSchema,
      headers: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }
  },
  handler: vocabHandler.edit
}, {
  method: 'DELETE',
  path: '/delete',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['teacher', 'admin']
    },
    description: 'delete vocabulary in database',
    tags: ['api', 'vocabulary'],
    validate: {
      payload: Joi.array().items(Joi.string().required().description('array of vocabid for deletion')).required(),
      headers: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }
  },
  handler: vocabHandler.delete
}];
