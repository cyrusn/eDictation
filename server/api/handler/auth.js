const Boom = require('boom');

const UserModel = require('../../db/model/user');
const AuthModel = require('../../db/model/auth');
const VocabModel = require('../../db/model/vocab');
const ResultModel = require('../../db/model/result');
const QuizModel = require('../../db/model/quiz');

module.exports = {
  register: (request, reply) => {
    const user = request.payload;
    register(user).then(reply, reply);
  },
  unregister: (request, reply) => {
    const user = request.payload;
    unregister(user).then(reply, reply);
  }
};

module.exports.test = {
  register, unregister
};

function unregister (user) {
    // check user identity before unregister
  const username = user.username;

  const authModel = new AuthModel({
    username: username,
    password: user.password
  });

  return authModel
    .isValid()
    .then(ok => {
      if (ok) return removeUserInAllCollections(username);
      return (Boom.unauthorized('Incorrect password.'));
    });
}

function removeUserInAllCollections (username) {
  const collections = [{
    path: 'username',
    model: UserModel
  }, {
    path: 'username',
    model: AuthModel
  }, {
    path: 'username',
    model: ResultModel
  }, {
    path: '_creator',
    model: QuizModel
  }, {
    path: '_creator',
    model: VocabModel
  }];

  const successMessage = {
    message: `${username} is unregistered successfully.`
  };

  return Promise.all(collections.map(collection => {
    // create a query object that contain information of given username
    const query = {};
    query[collection.path] = username;
    return collection.model
      .remove(query);
  })).then(() => {
    return successMessage;
  }, console.error);
}

function register (user) {
  const userObj = Object.assign({}, user);
  delete userObj.password;

  const username = user.username;
  const authObj = {
    username: username,
    password: user.password
  };

  const collections = [
    {
      model: AuthModel,
      newUser: authObj
    }, {
      model: UserModel,
      newUser: userObj
    }];

  const successMessage = {
    message: `${username} is registered successfully`
  };

  return Promise.all(collections.map(function (collection) {
    const Model = collection.model;
    const instance = new Model(collection.newUser);
    return instance.save();
  })).then(() => {
    return successMessage;
  }, err => {
    return Boom.badRequest(err);
  });
}
