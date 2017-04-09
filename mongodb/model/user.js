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
    schoolYear: {type: String, required: true},
    classCode: {type: String, required: true},
    classNo: {type: Number, required: true}
  }]
});

UserSchema.statics.findOneAndUpdatePassword = function (query, password) {
  const that = this;
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds)
  .then(hash => {
    console.log(hash);
    return that.findOne(query).update({password: hash});
  });
};

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
