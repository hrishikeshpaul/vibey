const { route, middleware, static } = require('./files');
const { write, read } = require('../config');

/**
 * Switches between different types of arguments 
 * Provides appropriate files for the argument
 * 
 * @param { array } options command line arguments
 */
const backendUtils = (options) => {
  const [ type, file ] = [...options];
  const root = read().backendRoot;

  switch(type) {
    case 'route':
    case 'r':
      write(`routes/${file}.js`, route, root);
      break; 

    case 'middleware':
    case 'middle':
    case 'mid':
    case 'm':
      write(`middlewares/${file}.js`, middleware, root);
      break;

    case 'static':
    case 'stat':
    case 'st':
    case 's':
      write(`static/${file}.js`, static, root);
      break;

    case 'lib':
    case 'l':
      write(`lib/${file}.js`, static, root);
      break;
  } 
}

module.exports = {
  backendUtils
}