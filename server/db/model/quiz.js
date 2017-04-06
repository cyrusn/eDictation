const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const logger = require('../helper/logger');

const QuizSchema = Schema({
  _creator: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  name: {type: String, required: true},
  vocabs: [{type: Schema.Types.ObjectId, ref: 'Vocab'}],
  targets: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Model = {
  name: 'Quiz',
  schema: QuizSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
