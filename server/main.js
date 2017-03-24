const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const Pack = require('./package');
const Config = require('./config');
const Logging = require('./helper/good');
const Routes = require('./api/route');

const connectDB = require('./db/connect');

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

server.register([Logging, Inert, Vision, {
  'register': HapiSwagger,
  'options': SwaggerOptions
}], (err) => {
  if (err) return;

  server.route(Routes);
});

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
  connectDB.connect();
});
