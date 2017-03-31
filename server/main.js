const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiJWT = require('hapi-auth-jwt2');
const process = require('process');

const Pack = require('./package');
const Config = require('./config');
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

const validate = function (decoded, request, cb) {
  // console.log(decoded);
  // validate user first
  const valid = true;
  if (valid) {
    return cb(null, true);
  }
  return cb(null, false);
};

const SwaggerOptions = {
  info: {
    'title': 'eDictation API Documentation',
    'version': Pack.version
  },
  basePath: '/api',
  pathPrefixSize: 2
};

server.connection({
  port: Port,
  host: Host
});

server.register([Logging, Inert, Vision, HapiJWT, {
  'register': HapiSwagger,
  'options': SwaggerOptions
}], (err) => {
  if (err) return;

  server.auth.strategy('jwt', 'jwt', {
    key: KEY,
    validateFunc: validate,
    verifyOptions: { algorithms: [ ALGORITHM ] }
  });

  server.route(Routes);
});

server.start(function () {
  logger.info(`ENV: ${process.env.NODE_ENV}`);
  logger.info('Server running at: ' + server.info.uri);
  connectDB(function (dbName) {
    logger.info(`connected to db [${dbName}]`);
  });
});
