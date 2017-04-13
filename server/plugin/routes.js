const _ = require('lodash');
// const Joi = require('joi');

const settings = [{
  routes: require('../route/publicFolder'),
  prefix: '/'
}, {
  routes: require('../route/test'),
  prefix: '/api/test'
}, {
  routes: require('../route/auth'),
  prefix: '/api/auth'
}, {
  routes: require('../route/vocab'),
  prefix: '/api/vocabs'
// }, {
//   routes: require('../api/route/quiz'),
//   prefix: '/api/quizzes'
//   scope: [ADMIN, TEACHER]
// }, {
//   routes: require('../api/route/quizResult'),
//   prefix: '/api/quiz/result',
}];

function register (server, options, next) {
  if (!options.settings) throw new Error('options.settings does not exist');
  const settings = options.settings;
  const routes = _.flatten(settings.map(parseSetting));
  server.route(routes);
  next();
}

register.attributes = {
  name: 'custom-routes-plugin',
  version: '1.0.0'
};

module.exports = {
  register,
  options: { settings }
};

// set prefix to route.path
function prefixize (prefix) {
  return route => {
    if (prefix !== '/') {
      if (route.path === '/') {
        route.path = prefix;
      } else {
        route.path = prefix + route.path;
      }
    }
    return route;
  };
}

function parseSetting (setting) {
  const prefixedRoute = setting.routes.map(prefixize(setting.prefix));

  return prefixedRoute;
}
