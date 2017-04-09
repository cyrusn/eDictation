module.exports = {
  command: 'import <path>',
  aliases: ['i'],
  desc: 'import user to database',
  builder: (yargs) => yargs.default('value', 'true'),
  handler: function (argv) {
    console.log(`import user from json file: ${argv.path}`);
  }
};
