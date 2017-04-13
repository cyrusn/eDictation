const Joi = require('joi');
const testHandler = require('../handler/test.js').test;
const userHandler = require('../handler/user');

module.exports = [
  {
    method: 'POST',
    path: '/import',
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      },
      description: 'import student users to database',
      tags: ['api', 'user']
    },
    handler: testHandler
  }, {
    method: 'POST',
    path: '/add',
    config: {
      // auth: {
      //   strategy: 'jwt',
      //   scope: ['admin']
      // },
      description: 'add user to database',
      tags: ['api', 'user'],
      validate: {
        payload: Joi.object().keys({
          username: Joi.string().required().description('username'),
          password: Joi.string().required().description('password'),
          ename: Joi.string().required().description('ename'),
          cname: Joi.string().description('cname'),
          role: Joi.string().required().valid(['admin', 'teacher', 'student']),
          cohort: Joi.when('role', {
            is: 'student',
            then: Joi.object().keys({
              schoolYear: Joi.string().required().description('e.g. 2016-17'),
              classCode: Joi.string().required().description('e.g. 4B'),
              classNo: Joi.number().required().description('class number')
            }).required()})
        })
      }
    },
    handler: userHandler.add
  }, {
    method: 'POST',
    path: '/password/update',
    config: {
      description: 'update user password',
      tags: ['api', 'user'],
      auth: {
        strategy: 'jwt',
        scope: ['admin', 'teacher']
      },
      validate: {
        payload: {
          // username: Joi.string().description('username').required(),
          password: Joi.string().description('password').required()
        }
        // headers: Joi.object({
        //   authorization: Joi.string().required()
        // }).unknown()
      }
    },
    handler: userHandler.updatePassword
  }
];
