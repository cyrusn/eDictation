const _ = require('lodash');

const auth = require('./auth.js');
const test = require('./test.js');
const publicFolder = require('./publicFolder.js');
const vocabulary = require('./vocabulary.js');
const quiz = require('./quiz.js');

module.exports = _.flatten([
  auth,
  test,
  publicFolder,
  vocabulary,
  quiz
]);
