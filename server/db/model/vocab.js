const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const vocabSchema = mongoose.Schema({
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
  name: 'Vocabulary',
  schema: vocabSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
