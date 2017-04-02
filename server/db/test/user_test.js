// use mocha to run the test
/* global describe it */
const assert = require('assert');
const UserModel = require('../model/user');
const dbManager = require('../manager');

describe('UserModel', () => {
  const users = [
    {
      username: 'cyrusn',
      firstName: 'Cyrus',
      lastName: 'Ngan',
      email: 'user1@gmail.com'
    },
    {
      username: 'winniec',
      firstName: 'Winnie',
      lastName: 'Chan',
      email: 'user2@gmail.com'
    },
    {
      username: 'alvinn',
      firstName: 'Alvin',
      lastName: 'Ngan',
      email: 'user3@gmail.com'
    }
  ];

  describe('#save()', () => {
    users.forEach(function (user) {
      it(`should save ${user.username} without error`, done => {
        UserModel(user).save(done);
      });

      it(`should can find ${user.username} in DB`, done => {
        UserModel.findOne(user, (err, data) => {
          assert.ok(data);
          done(err);
        });
      });
    });
  });

  describe('#drop collection', () => {
    it(`should drop collection [${UserModel.modelName}] without error`, (done) => {
      dbManager.dropCollection(UserModel, done);
    });
  });

  describe('#drop database', () => {
    it(`should drop database without error`, done => {
      dbManager.dropDatabase(done);
    });
  });
});
