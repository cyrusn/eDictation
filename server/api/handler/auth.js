const Boom = require('boom');

const UserModel = require('../../db/model/user');
const AuthModel = require('../../db/model/auth');
const VocabModel = require('../../db/model/vocab');
const ResultModel = require('../../db/model/result');
const QuizModel = require('../../db/model/quiz');

module.exports = {
  register: (request, reply) => {
    const user = request.payload;
    register(user).then(reply).catch(reply);
  },
  unregister: (request, reply) => {
    const user = request.payload;
    unregister(user).then(reply).catch(reply);
  }
};

function unregister (user) {
  return new Promise((resolve, reject) => {
    const authModel = new AuthModel({
      username: user.username,
      password: user.password
    });

    // check user identity before unregister
    authModel.isValid().then(ok => {
      if (ok) {
        return removeUserInAllCollections(user.username).then(result => {
          resolve({
            message: `${user.username} is unregistered successfully`
          });
        }).catch(reject);
      }
      return reject(Boom.unauthorized('Incorrect password'));
    }).catch(reject);
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

  return Promise.all(collections.map(collection => {
    // create a query object that contain information of given username
    const query = {};
    query[collection.path] = username;

    // find and remove by username / _creator
    return collection.model.remove(query);
  }));
}

function register (user) {
  return new Promise((resolve, reject) => {
    const userObj = Object.assign({}, user);
    delete userObj.password;

    const authObj = {
      username: user.username,
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

    Promise.all(collections.map(function (collection) {
      const Model = collection.model;
      const instance = new Model(collection.newUser);
      return instance.save();
    })).then(() => {
      resolve({
        message: `${userObj.username} is registered successfully`
      });
    }).catch((err) => {
      reject(Boom.badRequest(err));
    });
  });
}
