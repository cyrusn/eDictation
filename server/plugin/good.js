// good is hapiJS logging pluggin
const Good = require('good');
const Path = require('path');
const Config = require('../../setting')();

const LogFileConfig = Config.log;
const FilePath = Path.resolve(__dirname, '../', LogFileConfig.path, LogFileConfig.name);

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
