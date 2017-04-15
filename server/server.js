const Hapi = require('hapi');

const process = require('process');
const connectDB = require('../model/connect');

const Inert = require('inert');
const Vision = require('vision');
const JWT = require('./plugin/jwt');
const Logging = require('./plugin/good');
const Routes = require('./plugin/routes');
const Swagger = require('./plugin/swagger');

const logger = require('../helper/logger');
const Config = require('../setting');

const Path = require('path');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: { relativeTo: Path.join(__dirname, '../', Config.public.path) }
    }}
});

server.connection({
  port: Config.server.port,
  host: Config.server.host
});

server.register([
  Inert, Logging, Vision, JWT, Swagger, Routes
],
 err => {
   if (err) return console.error(err);
 });

server.start(function () {
  if (process.env.NODE_ENV) {
    logger.info(`NODE_ENV: [${process.env.NODE_ENV}]`);
  }
  logger.info(`Server running at: ${server.info.uri}`);
  connectDB();
});
