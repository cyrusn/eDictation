const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const Schema = mongoose.Schema;

// const roles = ['admin', 'teacher', 'student'];

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  // password: {type: String, required: true},
  // name: {type: String, required: true},
  // email: {type: String, required: true},
  // role: {type: String, enum: roles},
  vocabularies: [{type: Schema.Types.ObjectId, ref: 'Vocabulary'}]
});

const Model = {
  name: 'User',
  schema: userSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
