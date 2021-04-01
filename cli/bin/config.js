const fs = require('fs-extra');
const findUp = require('find-up');
const inquirer = require('inquirer');

/**
 * Set of input prompts for initializing
 * cli.json
 */
const dir = {
  backendRoot: `${process.cwd()}/src`,
  frontendRoot: `${process.cwd()}/src/app`,
}

/**
 * Input prompts and create cli.json
 */
const init = () => {
  fs.writeFile('cli.json', JSON.stringify(dir, null, 2), () => {
    console.log('You\'re all set! Below is your configuration,\n');
    console.log(read());
  })
}

/**
 * Read cli.json file
 * Return the contents of the file or null
 */
const read = () => {
  const configPath = findUp.sync(['cli.json']);
  const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : null;
  return config;
}

/**
 * Writes a file onto disk by taking specific params
 * 
 * @param { string } filePath path of file. appnds the root specified in cli.json
 * @param { string } file type of type. eg. route, middleware etc
 */
const write = (filePath, file, root) => {
  fs.outputFile(`${root}/${filePath}`, file, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Route created: ${root}/${filePath}`);
    }
  })
}

module.exports = {
  init,
  read,
  write
}