const fs = require('fs');
const _ = require('lodash');

const UserModel = require('../model/user');
const logger = require('../helper/logger');

const connectDB = require('../model/connect');
const mongoose = require('mongoose');

module.exports = {
  command: 'import <path>',
  aliases: ['i'],
  desc: 'import user to database, see ./README.md for json schema',
  builder: (yargs) => yargs.default('value', 'true'),
  handler: function (argv) {
    connectDB()
    .then(() => {
      return argv.path;
    }, console.error)
    .then(readJSON)
    .then(importUsersInSeries)
    .catch(console.error)
    .then(() => {
      mongoose.disconnect();
    });
  }
};

function importUsersInSeries (users) {
  return users.reduce((next, user) => {
    return next.then(() => add(user));
  }, Promise.resolve());
}

function readJSON (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) return reject(err);
      var obj = JSON.parse(data);
      return resolve(obj);
    });
  });
}

function add (user) {
  const username = user.username;
  const cohort = {
    schoolYear: user.schoolYear,
    classCode: user.classCode,
    classNo: user.classNo
  };

  return UserModel
    .findOne({username})
    .then(result => {
      if (!result) return saveNewUser(user);

      if (result.role !== 'student') return logger.log(`${username} existed`);

      const needUpdateCohort = isCohortExist(result.cohorts, cohort);
      if (needUpdateCohort) return logger.log(`Cohort existed, update terminated.`);

      return updateUserCohort(cohort, username)(result);
    });
}

function isCohortExist (cohorts, cohort) {
  return _(cohorts)
    .map('schoolYear')
    .includes(cohort.schoolYear);
}

function saveNewUser (user) {
  const newUser = Object.assign({}, user);
  delete newUser.cohort;

  newUser.cohorts = [user.cohort];

  return new UserModel(newUser)
    .save()
    .then(result => {
      logger.log(`${user.username} saved`);
      return result;
    });
}

function updateUserCohort (cohort, username) {
  return result => {
    return result.update({
      $push: {
        cohorts: cohort
      }
    }).then(result => {
      logger.log(`${username} updated cohort`);
      return result;
    });
  };
}
