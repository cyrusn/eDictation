const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const resultSchema = mongoose.Schema({
  quiz: {type: String, ref: 'Quiz'}
});

const Model = {
  name: 'Result',
  schema: resultSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
