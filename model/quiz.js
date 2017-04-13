const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const logger = require('../helper/logger');

const QuizSchema = Schema({
  creator: {type: String, required: true, ref: 'User'},
  name: {type: String, required: true, index: true},
  vocabs: [{type: Schema.Types.ObjectId, ref: 'Vocab'}],
  targets: [{type: String, ref: 'User'}]
});

const Model = {
  name: 'Quiz',
  schema: QuizSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
