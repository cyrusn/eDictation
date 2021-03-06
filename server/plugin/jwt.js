const jwt = require('jsonwebtoken');
const Boom = require('boom');

const Config = require('../../setting');
const KEY = Config.jwt.key;
const ALGORITHM = Config.jwt.algorithm;

const scheme = function (server, options) {
  const defaultOption = {
    algorithms: [ALGORITHM]
  };

  return {
    authenticate: function (request, reply) {
      const authToken = request.headers.authorization;
      if (!authToken) return reply(Boom.unauthorized('Missing jwt token in headers'));

      jwt.verify(authToken, KEY, options || defaultOption, (err, decoded) => {
        if (err) return reply(Boom.unauthorized(err));

        const credentials = {
          _id: decoded._id,
          username: decoded.username,
          scope: decoded.role
        };

        return reply.continue({credentials});
      });
    }
  };
};

module.exports.register = function (server, options, next) {
  server.auth.scheme('jwt', scheme);
  server.auth.strategy('jwt', 'jwt');
  next();
};

module.exports.register.attributes = {
  name: 'hapi-jwt-authentication-plugin',
  version: '1.0.0'
};
