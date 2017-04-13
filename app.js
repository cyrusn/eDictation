#!/usr/bin/env node

require('yargs')
  .command(require('./cli/import'))
  .command(require('./cli/serve'))
  .help()
  .argv;
