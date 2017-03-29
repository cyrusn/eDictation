const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  vocabularies: [{type: Schema.Types.ObjectId, ref: 'Vocab'}],
  quizzes: [{type: Schema.Types.ObjectId, ref: 'Quiz'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Model = {
  name: 'User',
  schema: userSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
