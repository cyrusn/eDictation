#!/usr/bin/env node

require('yargs')
  .command(require('./cli/serve'))
  .demandCommand()
  .help()
  .argv;
