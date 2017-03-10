const Hapi = require('hapi');
const Config = require('./config.json');
const Routes = require('./api/route.js');
const Logging = require('./helper/logging.js');
const Inert = require('inert');

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

server.register([Logging, Inert], (err) => {
  if (err) return;

  server.route(Routes);
});

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
});
