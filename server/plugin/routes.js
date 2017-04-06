const _ = require('lodash');
const Joi = require('joi');

const ADMIN = 'admin';
const TEACHER = 'teacher';
const STUDENT = 'student';

const settings = [{
  routes: require('../api/route/publicFolder'),
  prefix: '/',
  auth: false
}, {
  routes: require('../api/route/test'),
  prefix: '/api/test',
  auth: true,
  scope: [ADMIN, TEACHER, STUDENT]
}, {
  routes: require('../api/route/auth'),
  prefix: '/api/auth',
  auth: false
}, {
  routes: require('../api/route/teacher'),
  prefix: '/api/teacher',
  auth: true,
  scope: [ADMIN, TEACHER]
}, {
  routes: require('../api/route/student'),
  prefix: '/api/student',
  auth: true,
  scope: [STUDENT]
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
function enableJWT (setting, route) {
  if (!setting.auth) return route;

  route.config.auth = {
    strategy: 'jwt',
    scope: setting.scope
  };

  const validate = route.config.validate || {};

  validate.headers = Joi.object({
    authorization: Joi.string().required()
  }).unknown();

  route.config.validate = validate;
  return route;
}

function parseSetting (setting) {
  const prefixedRoute = setting.routes.map(prefixize(setting.prefix));

  return prefixedRoute.map(enableJWT.bind(null, setting));
}
