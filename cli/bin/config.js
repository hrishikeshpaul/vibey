const fs = require('fs-extra');
const findUp = require('find-up');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'backendRoot',
    message: "Root folder for backend? (default src)"
  },
]

const init = () => {
  inquirer.prompt(questions).then(answers => {
    for(let i in answers) {
      if(answers[i] === '') {
        answers[i] = 'src';
      } else {
        answers[i] = `${process.cwd()}/${answers[i]}`
      }
    }

    fs.writeFile('cli.json', JSON.stringify(answers, null, 2), () => {
      console.log('You\'re all set! Below is your configuration,\n');
      console.log(read());
    })
  })
}

const read = () => {
  const configPath = findUp.sync(['cli.json']);
  const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : null;
  return config;
}

const write = (filePath, file) => {
  const root = read().backendRoot;

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