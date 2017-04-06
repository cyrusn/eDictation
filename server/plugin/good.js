// good is hapiJS logging pluggin
const Good = require('good');
const Path = require('path');
const logger = require('../helper/logger');
const Config = require('../helper/config')();

const LogFileConfig = Config.log;
const FilePath = Path.resolve(__dirname, '../', LogFileConfig.path, LogFileConfig.name);

const displayPath = Path.relative(Path.resolve(__dirname, '../'), FilePath);

logger.info(`Log file Path: ${displayPath}`);

module.exports = {
  register: Good,
  options: {
    reporters: {
      ConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console',
        args: [
          {
            format: 'DD MMM HH:mm:ss.SSS',
            utc: false
          }
        ]
      },
        'stdout'],
      FileReport: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }]
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }, {
        module: 'good-file',
        args: [FilePath]
      }]
    }
  }
};
