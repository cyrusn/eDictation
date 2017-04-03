const _ = require('lodash');

const auth = require('./auth.js');
const user = require('./user.js');
const friend = require('./friend.js');
const test = require('./test.js');
const publicFolder = require('./publicFolder.js');
const vocabulary = require('./vocab.js');
const quiz = require('./quiz.js');

module.exports = _.flatten([
  auth,
  user,
  friend,
  test,
  publicFolder,
  vocabulary,
  quiz
]);
