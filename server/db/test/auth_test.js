// use mocha to run the test
/* global describe it after */
const AuthModel = require('../model/auth');
const dbManager = require('../manager');
const logger = require('../../helper/logger');
const assert = require('assert');

describe('AuthModel', () => {
  after(() => {
    dbManager.dropCollection(AuthModel, err => {
      if (err) return logger.error(err);
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

  describe('#save()', () => {
    const models = users.map(user => AuthModel(user));

    models.forEach(function (model) {
      it(`should save ${model.username} without error`, done => {
        model.save(done);
      });
    });
  });

  describe('#isValid()', () => {
    const models = users.map(user => AuthModel(user));

    models.forEach(function (model) {
      it(`should validate ${model.username}`, (done) => {
        model.isValid().then(function (ok) {
          assert.ok(ok);
          done();
        }).catch(done);
      });
    });
  });
});
