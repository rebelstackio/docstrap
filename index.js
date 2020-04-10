#!/usr/bin/env node

'use strict';

const gradient = require('gradient-string');
const program = require('commander');
const docstrap = require('./src/docstrap');

program.version(require('./package.json').version);
program.command('docstrap [dir]');

console.log('\n' + gradient.rainbow('~ D O C S T R A P J S   ♥') + '\n');

docstrap(program);

program.parse(process.argv);
