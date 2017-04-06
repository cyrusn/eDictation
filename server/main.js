const Hapi = require('hapi');

const process = require('process');
const connectDB = require('./db/connect');

// hapi plugin
const Inert = require('inert');
const Vision = require('vision');
const JWT = require('./plugin/jwt');
const Logging = require('./plugin/good');
const Routes = require('./plugin/routes');
const Swagger = require('./plugin/swagger');

const logger = require('./helper/logger');
const Config = require('./helper/config')();

const server = new Hapi.Server({
  connections: {
    routes: {
      files: { relativeTo: Config.public.path }
    }}
});

server.connection({
  port: Config.server.port,
  host: Config.server.host
});

server.register([
  Logging, Inert, Vision, JWT, Swagger, Routes
],
 err => {
   if (err) return console.error(err);
 });

server.start(function () {
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.info('Server running at: ' + server.info.uri);
  connectDB(function (dbName) {
    logger.info(`Connected to DB: [${dbName}]`);
  });
});
