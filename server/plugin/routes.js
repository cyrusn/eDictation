const _ = require('lodash');
const Joi = require('joi');

const settings = [{
  routes: require('../api/route/publicFolder'),
  prefix: '/',
  auth: false
}, {
  routes: require('../api/route/test'),
  prefix: '/api/test',
  auth: true
}, {
  routes: require('../api/route/auth'),
  prefix: '/api/auth',
  auth: false
}, {
  routes: require('../api/route/user'),
  prefix: '/api/user',
  auth: true
}, {
  routes: require('../api/route/friend'),
  prefix: '/api/user/friend',
  auth: true
}, {
  routes: require('../api/route/vocab'),
  prefix: '/api/vocabularies',
  auth: true
}, {
  routes: require('../api/route/quiz'),
  prefix: '/api/quizzes',
  auth: true
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

// set config.auth to jwt
function enableJWT (route) {
  route.config.auth = 'jwt';
  const validate = route.config.validate || {};

  validate.headers = Joi.object({
    authorization: Joi.string().required()
  }).unknown();

  route.config.validate = validate;
  return route;
}

function parseSetting (setting) {
  const prefixed = setting.routes.map(prefixize(setting.prefix));
  if (!setting.auth) {
    return prefixed;
  }

  return prefixed.map(enableJWT);
}
