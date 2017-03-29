const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const logger = require('../helper/logger');

const QuizSchema = mongoose.Schema({
  _creator: {type: String, required: true, unique: true, ref: 'User'},
  name: {type: String, required: true, unique: true},
  vocabularies: [{type: Schema.Types.ObjectId, ref: 'Vocab'}]
});

const Model = {
  name: 'Quiz',
  schema: QuizSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
