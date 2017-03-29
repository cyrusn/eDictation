// use mocha to run the test
/* global describe it after */
const assert = require('assert');

const UserModel = require('../../db/model/user');
const AuthModel = require('../../db/model/auth');
const VocabModel = require('../../db/model/vocab');
const ResultModel = require('../../db/model/result');
const QuizModel = require('../../db/model/quiz');

const dbManager = require('../manager');
const logger = require('../../helper/logger');

describe('AuthAPI', () => {
  after(() => {
    const models = [ UserModel, AuthModel, VocabModel, ResultModel, QuizModel ];
    models.forEach(model => {
      dbManager.dropCollection(AuthModel, err => {
        if (err) return logger.error(err);
      });
    });
  });

  const users = [{
    username: 'cyrusn',
    password: 'hello world'
  }, {
    username: 'winniec',
    password: 'hello foo'
  }, {
    username: 'alvinn',
    password: 'hello bar'
  }];

  describe('#register', () => {
    // const models = users.map(user => AuthModel(user));

    // models.forEach(function (model) {
    //   it(`should save ${model.username} without error`, (done) => {
    //     model.save(done);
    //   });
    // });
  });

  describe('#unregister()', () => {
    // const models = users.map(user => AuthModel(user));

    // models.forEach(function (model) {
    //   it(`should validate ${model.username}`, (done) => {
    //     model.isValid().then(function (result) {
    //       console.log(result.user, result.ok);
    //       assert.ok(result.ok);
    //       done();
    //     }).catch(done);
    //   });
    // });
  });
});
