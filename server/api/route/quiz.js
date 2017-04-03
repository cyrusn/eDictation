const Joi = require('joi');
const testHandler = require('../handler/test.js').test;

const helperFunc = require('../../helper/func');
const addPrefix = helperFunc.addPrefix;
const enableJWT = helperFunc.enableJWT;

const quizSchema = Joi.object({
  id: Joi.string(),
  vocabs: Joi.array().description('list of vocabulary id')
});

const resultSchema = Joi.object({
  quiz_id: Joi.string(),
  username: Joi.string(),
  timestamp: Joi.date().timestamp(),
  response: {
    title: Joi.array().items(Joi.string()).description('the array of question'),
    answer: Joi.array().items(Joi.string()).description('the array of answer')
  }
});

const routes = [
  {
    method: 'POST',
    path: '/create',
    config: {
      description: 'create the list of vocab_id for front end to create a quiz',
      notes: 'backend only provide the list of vocab_id, frontend will manange the logic part of quiz',
      tags: ['api', 'quiz'],
      validate: {
        payload: Joi.array().description('list of vocab_id')
      },
      response: {
        schema: quizSchema
      }
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/share',
    config: {
      description: 'share quiz to users',
      tags: ['api', 'quiz'],
      validate: {
        payload: testHandler
      }
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/{quiz_id}/edit',
    config: {
      description: 'edit the existance quiz',
      notes: 'backend only provide the list of vocabulary id, frontend will manange the logic part of quiz ',
      tags: ['api', 'quiz'],
      response: {
        schema: quizSchema
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
    path: '/{quiz_id}/save',
    config: {
      description: 'save the result of the quiz',
      tags: ['api', 'quiz'],
      validate: {
        payload: resultSchema
      }
    },
    handler: testHandler
  }, {
    method: 'GET',
    path: '/result',
    config: {
      description: 'get all the quiz reuslts',
      tags: ['api', 'quiz'],
      validate: {
        query: {
          quiz_id: Joi.string()
        }
      },
      response: {
        schema: Joi.array().items(resultSchema)
      }
    },
    handler: testHandler
  }
];

module.exports = routes.map(addPrefix('/api/quizzes')).map(enableJWT);
