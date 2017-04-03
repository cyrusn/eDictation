const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const logger = require('../helper/logger');

const defination = require('./defination');

const VocabSchema = Schema({
  _creator: {type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User'},
  title: {type: String, required: true},
  tags: [{type: String, lowercase: true, trim: true, index: true}],
  level: {type: Number, required: true, min: 1, max: 5},
  phonetic: {type: String},
  definations: [defination]
});

const Model = {
  name: 'Vocab',
  schema: VocabSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
