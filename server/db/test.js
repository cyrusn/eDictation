const assert = require('assert');
var async = require('async');

const mongoose = require('mongoose');
const logger = require('../helper/logger');

const UserModel = require('./model/user');

const connectDB = require('./connect');

const dbName = require('../config').db.name;

connectDB.connect(() => {
  logger.info('Connected to DB: ' + dbName);
});

// const hello = {
//   title: 'hello',
//   definations: [{
//     chi: '你好',
//     examples: [{
//       text: 'Hello World',
//       translation: '你好，世界'
//     }]
//   }]
// };

describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      // var user = new User('Luna');
      // user.save(done);

      const cyrus = new UserModel({
        username: 'alvin'
      });

      cyrus.save(checkErr).then(function () {
        UserModel.find({}, function (err, data) {
          if (err) done(err);
          console.log(data);
          done();
        });
      });
    });
  });
});

function checkErr (err) {
  if (err) return console.error('');
}
