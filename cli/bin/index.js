#! /usr/bin/env node
"use strict";

const { init, read } = require('./config');
const { backendUtils } = require('./backend');
const { help } = require('./help');

/**
 * Removing the first 2 arguments as its
 * not required
 */
const args = process.argv.slice(2, process.argv.length);

if (args.length === 0) {
  /**
   * Show help if no arguments are provided
   */
  console.log(help);
} else if (args[0] === 'init') {
  /**
   * Initialize the cli.json file
   */
  init();
} else if (args[0] === 'help') {
  /**
   * Show help
   */
  console.log(help);
} else {
  /**
   * Check if cli.json (config) file is present
   * if not, run init()
   */
  if(!read()) {
    init();
  }

  /**
   * Check for module
   */
  switch(args[0]) {
    /**
     * Backend module
     */
    case 'b':
      backendUtils(args.slice(1, args.length)); break;
    /**
     * Frontend module
     */
    case 'f':
      console.log('Frontend'); break;
    /**
     * Default show help
     */
    default:
      console.log(help)
  }
}