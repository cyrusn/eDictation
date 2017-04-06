// const logger = require('../../helper/logger');
const Boom = require('boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../../db/model/user');

const Config = require('../../helper/config')();
const JWTConfig = Config.jwt;
const KEY = JWTConfig.key;
const EXP = JWTConfig.exp;
const ALGORITHM = JWTConfig.algorithm;

const JWTOption = {
  expiresIn: EXP,
  algorithm: ALGORITHM
};

module.exports = {
  import: (request, reply) => {
    const users = request.payload;
    importUser(users).then(reply, reply);
  },
  sign: (request, reply) => {
    const payload = request.payload;
    const username = payload.username;
    const password = payload.password;
    sign(username, password).then(reply, reply);
  },
  refresh: (request, reply) => {
    const headers = request.headers;
    refresh(headers.authorization).then(reply, reply);
  }
};

module.exports.test = {
  importUser, sign, refresh
};

function refresh (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, KEY, function (err, decoded) {
      if (err) return reject(Boom.badRequest(err));

      const newToken = jwt.sign({data: decoded.data}, KEY, JWTOption);
      return resolve({
        token: newToken
      });
    });
  });
}

function sign (username, password) {
  return authorize(username, password)
    .then(payload => {
      if (!payload) return promiseBoomReject('unauthorized')();
      const token = jwt.sign(payload, KEY, JWTOption);
      return {token};
    });
}

function authorize (username, password) {
  return UserModel.findOne({username})
    .select('-__v ')
    .then(user => {
      if (!user) return promiseBoomReject('notFound', `${username} not found.`)();
      return user;
    })
    .then(user => bcrypt.compare(password, user.password, function (err, ok) {
      if (!ok || err) return promiseBoomReject('unauthorized')(err);
      return Promise.resolve(user);
    }));
}

function importUser (users) {
  const successResponse = results => {
    const message = `${results.length} users are imported`;
    return {message};
  };

  return Promise.all(users.map(register))
  .then(successResponse);
}

function register (user) {
  const createSuccessResponse = user => {
    const message = `${user.username} is registered successfully`;
    return {message};
  };

  const userModel = UserModel(user);

  return userModel
    .save()
    .then(
      createSuccessResponse,
      promiseBoomReject('badRequest')
    );
}

function promiseBoomReject (methodName, overrideMessage) {
  return function (err) {
    return Promise.promiseBoomReject(Boom[methodName](overrideMessage || err));
  };
}
