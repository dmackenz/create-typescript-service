#!/usr/bin/env node

const program = require('commander');
const { err } = require('./log');
const { createService } = require('./create');

program
  .version(require('../package.json').version)
  .arguments('<service>')
  .parse(process.argv);

const serviceName = program.args[0];

if (!serviceName) {
  err('Must include service name as a parameter.');
} else {
  createService(serviceName);
}
