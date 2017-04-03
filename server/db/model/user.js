const mongoose = require('mongoose');
// const logger = require('../helper/logger');

const Schema = mongoose.Schema;

const defination = require('./defination');

const UserSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  vocabularies: [{type: Schema.Types.ObjectId, ref: 'Vocab'}],
  customizations: [{
    vocabid: {type: Schema.Types.ObjectId, ref: 'Vocab'},
    definations: [defination]
  }],
  quizzes: [{type: Schema.Types.ObjectId, ref: 'Quiz'}],
  friendLists: [{
    name: {type: String, required: true, default: 'friends'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
  }]
});

const Model = {
  name: 'User',
  schema: UserSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
