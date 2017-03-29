const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const logger = require('../helper/logger');

const VocabSchema = Schema({
  _creator: {type: String, required: true, unique: true, ref: 'User'},
  title: {type: String, required: true},
  phonetic: {type: String},
  definations: [{
    partOfSpeech: {type: String},
    eng: {type: String},
    chi: {type: String},
    examples: [{
      text: {type: String},
      translation: {type: String}
    }]
  }]
});

const Model = {
  name: 'Vocab',
  schema: VocabSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
