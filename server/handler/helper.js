const Boom = require('boom');

module.exports = {
  PromiseBoomReject
};

function PromiseBoomReject (methodName) {
  return err => {
    const BoomMessage = Boom[methodName](err);
    return BoomMessage;
  };
}
