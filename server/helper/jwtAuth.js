const jwt = require('jsonwebtoken');
const Boom = require('boom');

const Config = require('../helper/config')();
const KEY = Config.jwt.key;
const ALGORITHM = Config.jwt.algorithm;

const scheme = function (server, options) {
  const defaultOption = {
    algorithms: [ALGORITHM]
  };

  return {
    authenticate: function (request, reply) {
      const authToken = request.headers.authorization;

      jwt.verify(authToken, KEY, options || defaultOption, (err, decoded) => {
        const credentials = {
          credentials: decoded
        };

        if (err) return reply(Boom.unauthorized(err), null, credentials);

        return reply.continue(credentials);
      });
    }
  };
};

exports.register = function (server, options, next) {
  server.auth.scheme('jwt', scheme);
  server.auth.strategy('jwt', 'jwt');
  next();
};

exports.register.attributes = {
  name: 'hapi-jwt-authentication-plugin',
  version: '1.0.0'
};
