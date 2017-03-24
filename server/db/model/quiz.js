const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const quizSchema = mongoose.Schema({

});

const Model = {
  name: 'Quiz',
  schema: quizSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
