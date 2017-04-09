const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const logger = require('../helper/logger');

const VocabSchema = Schema({
  creator: {type: String, required: true, ref: 'User'},
  title: {type: String, required: true},
  definations: [{type: String}],
  phonetic: {type: String},
  remark: {type: String},
  level: {type: Number, min: 1, max: 5, default: 1}
});

const Model = {
  name: 'Vocab',
  schema: VocabSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
