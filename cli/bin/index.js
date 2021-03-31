#! /usr/bin/env node
"use strict";

const { init, read } = require('./config');
const { backendUtils } = require('./backend');
const { help } = require('./help');

const args = process.argv.slice(2, process.argv.length);

if (args.length === 0) {
  console.log(help);
} else if (args[0] === 'init') {
  init();
} else if (args[0] === 'help') {
  console.log(help);
} else {
  if(!read()) {
    init();
  }

  switch(args[0]) {
    case 'b':
      backendUtils(args.slice(1, args.length)); break;
    case 'f':
      console.log('Frontend'); break;
    default:
      console.log(help)
  }
}