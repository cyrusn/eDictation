// good is hapiJS logging pluggin
const Good = require('good');
const LogFileConfig = require('../config.json').log;
const Path = require('path');

const FilePath = Path.resolve(__dirname, '../', LogFileConfig.path, LogFileConfig.name);

console.log(`Log file Path: ${FilePath}`);

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
