const { write, read } = require('../config');
const { component, mod, scss, hook, service, actionTypes, reducer, action } = require('./files');

/**
 * Get the file name for a nested path
 * 
 * @param {string} path get path 
 */
const filterName = (path) => {
  const splitName = path.split('/');
  return splitName[splitName.length - 1]
}

/**
 * Switches between different types of arguments 
 * Provides appropriate files for the argument
 * 
 * @param { array } options command line arguments
 */
const frontendUtils = (options) => {
  const [ type, file ] = [...options];
  const root = read().frontendRoot;
  const cName = file.charAt(0).toUpperCase() + file.slice(1);
  const fileName = filterName(file);

  switch(type) {
    case 'component':
    case 'comp':
    case 'c':
      write(`components/${file}.tsx`, component(fileName), root);
      write(`components/${file}.scss`, scss, root);
      break;

    case 'module':
    case 'mod':
    case 'm':
      write(`modules/${file}.tsx`, mod(fileName), root);
      write(`modules/${file}.scss`, scss, root);
      break;
    
    case 'hook':
    case 'h':
      write(`hooks/use${cName}.ts`, hook, root);
      break;
    
    case 'service':
    case 'svc':
    case 's':
      write(`services/${file}.service.ts`, service, root);
      break;
    
    case 'state':
      write(`store/${fileName}/${file}ActionTypes.ts`, actionTypes(fileName), root);
      write(`store/${fileName}/${file}Reducer.ts`, reducer(fileName), root);
      write(`store/${fileName}/${file}Action.ts`, action(fileName), root);
      break;
  } 
}

module.exports = {
  frontendUtils
}