const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  role: {type: String, required: true, enum: ['student', 'teacher', 'admin']},
  ename: {type: String, required: true},
  cname: {type: String},
  cohorts: [{
    schoolYear: {type: String},
    classCode: {type: String},
    classNo: {type: Number}
  }]
});

UserSchema.pre('save', function (next) {
  var that = this;
  const saltRounds = 10;
  bcrypt.hash(that.password, saltRounds)
  .then(function (hash) {
    that.password = hash;
    next();
  }, next);
});

const Model = {
  name: 'User',
  schema: UserSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
