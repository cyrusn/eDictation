// const logger = require('../helper/logger');
const mongoose = require('mongoose');

module.exports = {
  dropCollection: function (model, cb) {
    // logger.warn(`Dropping collection: [${model.modelName}]...`);
    model.remove({}, cb);
  },
  dropDatabase: function (cb) {
    // logger.warn('Dropping Database...');
    mongoose.connection.db.dropDatabase(cb);
  }
};
