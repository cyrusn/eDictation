// const logger = require('../../helper/logger');
const Boom = require('boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../../db/model/user');
const AuthModel = require('../../db/model/auth');
const VocabModel = require('../../db/model/vocab');
const ResultModel = require('../../db/model/result');
const QuizModel = require('../../db/model/quiz');

const JWTConfig = require('../../config').jwt;
const KEY = JWTConfig.key;
const EXP = JWTConfig.exp;
const ALGORITHM = JWTConfig.algorithm;

const JWTOption = {
  expiresIn: EXP,
  algorithm: ALGORITHM
};

module.exports = {
  register: (request, reply) => {
    const user = request.payload;
    register(user).then(reply, reply);
  },
  unregister: (request, reply) => {
    const validator = request.payload;
    unregister(validator).then(reply, reply);
  },
  sign: (request, reply) => {
    const validator = request.payload;
    sign(validator).then(reply, reply);
  },
  refresh: (request, reply) => {
    const headers = request.headers;
    refresh(headers.authorization).then(reply, reply);
  }
};

module.exports.test = {
  register, unregister, sign, refresh
};

function refresh (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, KEY, function (err, decoded) {
      if (err) {
        return reject(Boom.badRequest(err));
      }
      const newToken = jwt.sign({data: decoded.data}, KEY, JWTOption);
      return resolve({
        token: newToken
      });
    });
  });
}

function sign (validator) {
  const errNotFoundMessage = Boom.unauthorized();
  return validate(validator)
    .then(user => {
      if (!user) return Promise.reject(errNotFoundMessage);
      const token = jwt.sign(user._doc, KEY, JWTOption);
      return {token};
    });
}

// validator have alias and password key
function unregister (validator) {
  const successMessage = {
    message: `${validator.alias} is unregistered`
  };

  return validate(validator)
    .then(result => {
      if (!result) throw Boom.unauthorized('Incorrect password.');
      return removeUserInAllCollections(result._id);
    })
    .then(result => {
      return successMessage;
    });
}

function convertUserAliasToQuery (alias) {
  const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isEmail = emailReg.test(alias);

  if (isEmail) return {email: alias};
  return {username: alias};
}

function validate (validator) {
  const errNotFoundMessage = Boom.notFound(`${validator.alias} not found.`);
  const query = convertUserAliasToQuery(validator.alias);

  return UserModel.findOne(query)
    .select('-__v -vocabularies -friends -quizzes')
    .then(user => {
      if (!user) return Promise.reject(errNotFoundMessage);
      return user;
    })
    .then(user => {
      return AuthModel
      .findOne({userid: user._id})
      .then(auth => {
        return bcrypt.compare(validator.password, auth.password);
      })
      .then(ok => {
        if (ok) return Promise.resolve(user);
        return Promise.resolve(null);
      });
    });
}

function removeUserInAllCollections (userid) {
  const collections = [{
    path: '_id',
    model: UserModel
  }, {
    path: 'userid',
    model: AuthModel
  }, {
    path: 'userid',
    model: ResultModel
  }, {
    path: '_creator',
    model: QuizModel
  }, {
    path: '_creator',
    model: VocabModel
  }];

  return Promise.all(collections.map(collection => {
    const query = {};
    query[collection.path] = userid;
    const Model = collection.model;

    return Model.remove(query);
  }));
}

function register (user) {
  const userObj = Object.assign({}, user);
  delete userObj.password;

  const userModel = UserModel(userObj);

  const successMessage = {
    message: `${user.username} is registered successfully`
  };

  return userModel
    .save()
    .then(result => {
      const authObj = {
        userid: result._id,
        password: user.password
      };

      const authModel = AuthModel(authObj);
      return authModel.save();
    })
    .then(() => {
      return successMessage;
    }, err => {
      return Promise.reject(Boom.badRequest(err));
    });
}
