const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const logger = require('../helper/logger');

const VocabSchema = Schema({
  creator: {type: String, required: true, ref: 'User'},
  title: {type: String, required: true, unique: true, index: true},
  phonetic: {type: String},
  definations: [{
    partOfSpeeches: [{type: String}],
    translations: [{type: String}],
    examples: [{type: String}]
  }],
  level: {type: Number, min: 1, max: 5, default: 1}
});

const Model = {
  name: 'Vocab',
  schema: VocabSchema
};

VocabSchema.set({autoIndex: false});
VocabSchema.index({'creator': 1, 'title': 1});
module.exports = mongoose.model(Model.name, Model.schema);
