const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Process = require('process');

const Logging = require('./helper/good');
const logger = require('./helper/logger');

const Routes = require('./api/route');
const connectDB = require('./db/connect');

const Swagger = require('./helper/swagger');
const JWTAuth = require('./helper/jwtAuth');

const Config = require('./helper/config')();
const Port = Config.server.port;
const Host = Config.server.host;
const PublicPath = Config.public.path;

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: PublicPath
      }
    }
  }
});

server.connection({
  port: Port,
  host: Host
});

server.register([Logging, Inert, Vision, JWTAuth, Swagger], (err) => {
  if (err) return console.error(err);
  server.route(Routes);
});

server.start(function () {
  logger.info(`NODE_ENV: ${Process.env.NODE_ENV}`);
  logger.info('Server running at: ' + server.info.uri);
  connectDB(function (dbName) {
    logger.info(`connected to db [${dbName}]`);
  });
});
