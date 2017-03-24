// Connect to mongodb throught mongoose
const mongoose = require('mongoose');
const dbName = require('../config').db.name;
const logger = require('../helper/logger');

mongoose.connect('mongodb://localhost/' + dbName);

const db = mongoose.connection;

module.exports = {
  connect: function connect (cb) {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', cb);
  },
  dropCollection: function (model, cb) {
    logger.warn('* Dropping collection [%s]...', model.modelName);
    model.remove({}, function (err) {
      logger.info('* > Dropping [%s] done, err[%s]\n', model.modelName, err);
      if (cb && typeof cb === 'function') {
        cb(err);
      }
    });
  },
  dropDatabase: function (cb) {
    logger.warn('\n>>>>>> Dropping Database! \n>>>>>> Done: %s', dbName);
    db.dropDatabase(cb);
  }
};
