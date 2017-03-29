const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Boom = require('boom');

const Schema = mongoose.Schema;

const AuthSchema = Schema({
  username: {type: String, required: true, unique: true, ref: 'User'},
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

AuthSchema.methods.isValid = function () {
  const authSchema = this;
  const password = authSchema.password;

  const AuthModel = authSchema.model(Model.name);

  const errorMessage = `${authSchema.username} is not registered`;

  return AuthModel.findOne({
    username: authSchema.username
  }).then(function (result) {
    if (!result) {
      return Boom.notFound(errorMessage);
    }
    return bcrypt.compare(password, result.password);
  }).catch((err) => {
    return Boom.badRequest(err);
  });
};

const Model = {
  name: 'Auth',
  schema: AuthSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
