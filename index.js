#!/usr/bin/env node

'use strict';

const program = require('commander');
const docstrap = require('./src/docstrap');

program.version(require('./package.json').version);
program.command('docstrap [dir]')

docstrap(program);

program.parse(process.argv);
