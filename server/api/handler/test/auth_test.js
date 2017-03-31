// use mocha to run the test
/* global describe it after before */
// const assert = require('assert');

const UserModel = require('../../../db/model/user');
const AuthModel = require('../../../db/model/auth');
const VocabModel = require('../../../db/model/vocab');
const ResultModel = require('../../../db/model/result');
const QuizModel = require('../../../db/model/quiz');
const connectDB = require('../../../db/connect');

const testFunction = require('../auth').test;

const dbManager = require('../../../db/manager');
const logger = require('../../../helper/logger');

const user = {
  'username': 'CyrusN',
  'password': 'hello world',
  'firstName': 'Cyrus',
  'lastName': 'Ngan',
  'email': 'cyrusncy@gmail.com'
};

describe('AuthAPI', () => {
  before(done => {
    connectDB(() => {
      logger.info('Connected to DB.');
      done();
    });
  });

  after(() => {
    const models = [ UserModel, AuthModel, VocabModel, ResultModel, QuizModel ];
    models.forEach(model => {
      dbManager.dropCollection(model, err => {
        if (err) return logger.error(err);
      });
    });
  });

  describe('#sign()', function () {
    const register = testFunction.register;
    const sign = testFunction.sign;
    const refresh = testFunction.refresh;

    it('should sign and refresh JWT without error', done => {
      register(user)
      .then(sign.bind(null, user))
      .then(result => {
        console.log('token:\n', result);
        return result.token;
      })
      .then(token => {
        setTimeout(function () {
          refresh(token).then(newToken => {
            console.log('new token:\n', newToken);
            done();
          });
        }, 1500);
      });
    });
  });

  describe('#register', () => {
    it('should register an user without error', done => {
      testFunction.register(user).then(result => {
        done();
      }, done);
    });
  });

  describe('#unregister()', () => {
    it('should unregister an user without error', done => {
      const unregister = testFunction.unregister;
      unregister(user).then(() => {
        done();
      }, done);
    });
  });
});
