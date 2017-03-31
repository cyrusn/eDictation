const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AuthSchema = Schema({
  userid: {type: String, required: true, unique: true, ref: 'User'},
  password: {type: String, required: true}
});

AuthSchema.pre('save', function (next) {
  var that = this;
  const saltRounds = 10;
  bcrypt.hash(that.password, saltRounds)
  .then(function (hash) {
    that.password = hash;
    next();
  }, next);
});

const Model = {
  name: 'Auth',
  schema: AuthSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
