// this logger help to colorise logs in console.
const colors = require('colors');
const tracer = require('tracer');

const filters = {
  log: colors.grey,
  trace: colors.magenta,
  debug: colors.green,
  info: colors.cyan,
  warn: colors.yellow,
  error: [colors.red, colors.bold]
};
const format = '{{timestamp}} {{title}}/{{file}}:{{line}} {{message}}';

const logger = tracer.colorConsole({
  format: [
    format, // default format
    {
      error: format + '\nCall Stack:\n{{stack}}' // error format
    }
  ],
  dateformat: 'HH:MM:ss.L',
  preprocess: function (data) {
    data.title = data.title[0].toUpperCase();
  },
  filters: filters
});

module.exports = logger;
