// Connect to mongodb throught mongoose
const mongoose = require('mongoose');
const Config = require('../setting')();
const dbName = Config.db.name;

module.exports = function (cb) {
  // reference: mpromise is depreciated, therefore have to plugin an own-promises-library
  // http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://localhost/${dbName}`);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', cb.bind(null, dbName));
};
