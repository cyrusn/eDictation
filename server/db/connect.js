// Connect to mongodb throught mongoose
const mongoose = require('mongoose');
const dbName = require('../config').db.name;

// reference: mpromise is depreciated, therefore have to plugin an own-promises-library
// http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library

module.exports = function (cb) {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://localhost/${dbName}`);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', cb.bind(null, dbName));
};
