const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const JWTAuth = require('hapi-auth-jwt2');
const process = require('process');

const Config = require('./helper/config').get();
const Logging = require('./helper/good');
const Routes = require('./api/route');

const connectDB = require('./db/connect');
const logger = require('./helper/logger');

const Port = Config.server.port;
const Host = Config.server.host;
const PublicPath = Config.public.path;

const KEY = Config.jwt.key;
const ALGORITHM = Config.jwt.algorithm;

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: PublicPath
      }
    }
  }
});

const UserModel = require('./db/model/user');
const validate = function (decoded, request, cb) {
  logger.warn(decoded);
  return UserModel.findOne({
    _id: decoded.id
  })
  .then(user => {
    if (!user) return cb(null, false);
    return user;
  }, cb)
  .then(user => {
    return cb(null, true);
  });
};

const SwaggerOptions = Config.SwaggerOptions;

server.connection({
  port: Port,
  host: Host
});

server.register(JWTAuth, function (err) {
  if (err) return console.error(err);
  server.auth.default('jwt');
});
server.auth.strategy('jwt', 'jwt', {
  key: KEY,
  validateFunc: validate,
  verifyOptions: { algorithms: [ ALGORITHM ] }
});

server.register([Logging, Inert, Vision, {
  'register': HapiSwagger,
  'options': SwaggerOptions
}], (err) => {
  if (err) return console.error(err);
  server.route(Routes);
});

server.start(function () {
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.info('Server running at: ' + server.info.uri);
  connectDB(function (dbName) {
    logger.info(`connected to db [${dbName}]`);
  });
});
