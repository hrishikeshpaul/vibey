const { route, middleware, static } = require('./files');
const { write } = require('./config');

/**
 * Switches between different types of arguments 
 * Provides appropriate files for the argument
 * 
 * @param { array } options command line arguments
 */
const backendUtils = (options) => {
  const [ type, file ] = [...options];
  switch(type) {
    case 'route':
      write(`routes/${file}.js`, route);
    break; 
    case 'mid':
      write(`middlewares/${file}.js`, middleware);
    break;
    case 'st':
      write(`static/${file}.js`, static);
    break;
    case 'lib':
      write(`lib/${file}.js`, static);
    break;
  } 
}

module.exports = {
  backendUtils
}