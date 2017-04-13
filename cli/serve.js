module.exports = {
  command: 'serve',
  aliases: ['s'],
  desc: 'start server',
  handler: function (argv) {
    require('../server/server');
  }
};
