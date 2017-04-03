const Joi = require('joi');

function addPrefix (prefix) {
  return (obj) => {
    obj.path = prefix + obj.path;
    return obj;
  };
}

function enableJWT (route) {
  route.config.auth = 'jwt';
  const validate = route.config.validate || {};

  validate.headers = Joi.object({
    authorization: Joi.string().required()
  }).unknown();

  route.config.validate = validate;
  return route;
}

module.exports = {
  addPrefix,
  enableJWT
};
