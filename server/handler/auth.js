// const logger = require('../../helper/logger');
const Boom = require('boom');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../../model/user');

const Config = require('../../setting');
const JWTConfig = Config.jwt;
const KEY = JWTConfig.key;
const EXP = JWTConfig.exp;
const ALGORITHM = JWTConfig.algorithm;

const JWTOption = {
  expiresIn: EXP,
  algorithm: ALGORITHM
};

module.exports = {
  sign: (request, reply) => {
    const payload = request.payload;
    const username = payload.username;
    const password = payload.password;
    sign(username, password).then(reply).catch(reply);
  },
  refresh: (request, reply) => {
    const headers = request.headers;
    refresh(headers.authorization).then(reply).catch(reply);
  }
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
  const rejectMessage = `${username} not found.`;

  return UserModel.findOne({username})
    .select('-__v ')
    .lean()
    .exec()
    .then(user => {
      if (!user) return Promise.reject(Boom.notFound(rejectMessage));
      return user;
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password,
       function (err, ok) {
         if (!ok || err) return reject(Boom.unauthorized(err));
         return resolve(user);
       });
      });
    })
    .then(user => {
      const payload = Object.assign({}, user);
      delete payload.password;
      const token = jwt.sign(payload, KEY, JWTOption);
      return {token};
    });
}
