// Connect to mongodb throught mongoose
const mongoose = require('mongoose');
const logger = require('../helper/logger');
const Config = require('../setting');
const dbName = Config.db.name;
mongoose.Promise = global.Promise;

module.exports = connectDB;

function connectDB () {
  // reference: mpromise is depreciated, therefore have to plugin an own-promises-library
  // http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library

  return mongoose.connect(`mongodb://localhost/${dbName}`)
  .then(() => {
    logger.info(`MongoDB: [${dbName}] connected`);
    const db = mongoose.connection;
    return db;
  })
  .then(db => {
    db.on('disconnected', logger.info.bind(console, `MongoDB: [${dbName}] disconnected`));
    return dbName;
  }, console.error.bind(console, `connection error`));
}
