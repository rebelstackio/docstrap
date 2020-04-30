#!/usr/bin/env node

'use strict';

const gradient = require('gradient-string');
const program = require('commander');
const docstrap = require('./src/docstrap');
const { getASCIIBanner } = require('./src/utils')

program.version(require('./package.json').version);
program.command('docstrap [dir]');

const title = getASCIIBanner();
console.log('\n' + gradient.rainbow(title) + '\n');

docstrap(program);

program.parse(process.argv);
