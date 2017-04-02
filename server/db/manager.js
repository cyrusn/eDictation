// const logger = require('../helper/logger');
const mongoose = require('mongoose');

module.exports = {
  dropCollection: function (model, cb) {
    model.remove({}, cb);
  },
  dropDatabase: function (cb) {
    mongoose.connection.db.dropDatabase(cb);
  }
};
