const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true, ref: 'User'},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  vocabularies: [{type: Schema.Types.ObjectId, ref: 'Vocab'}],
  quiz: [{type: Schema.Types.ObjectId, ref: 'Quiz'}]
});

const Model = {
  name: 'User',
  schema: userSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
