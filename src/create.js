const shelljs = require('shelljs');
const path = require('path');
const { log, err } = require('./log');

const dependencies = [
  'json',
  'typescript',
  'express',
  '@types/express',
  'helmet',
  'body-parser',
  'nodemon',
];

const scripts = [
  ['build', 'tsc'],
  ['start', 'node build/index.js'],
  ['dev', 'nodemon node build/index.js'],
  ['clean', 'rm -rf ./build'],
];

const createService = async (service) => {
  try {
    log(`Creating service ${service}`);
    shelljs.exec(`rm -rf ${service}`);
    shelljs.exec(`mkdir ${service}`);
    shelljs.cd(service);

    log('Initializing npm repository');
    shelljs.exec('npm init -y');

    dependencies.forEach((dependency) => {
      log(`Installing ${dependency}`);
    });
    shelljs.exec(`npm i ${dependencies.join(' ')}`);

    log('Editing scripts inside of package.json');
    scripts.forEach((script) => {
      shelljs.exec(`npx json -I -f package.json -e 'this.scripts.${script[0]}="${script[1]}"'`);
    });

    log('Creating dockerfile');
    shelljs.exec(`cp ${path.join(__dirname, 'entities', 'Dockerfile')} Dockerfile`);

    log('Creating typescript configuration');
    shelljs.exec(`cp ${path.join(__dirname, 'entities', 'tsconfig.json')} tsconfig.json`);

    log('Creating src folder');
    shelljs.mkdir('src');

    log('Creating index script');
    shelljs.exec(`cp ${path.join(__dirname, 'entities', 'index.ts')} src/index.ts`);

    log('Creating routes folder');
    shelljs.mkdir('src/routes');

    log('Creating BasicRouter script');
    shelljs.exec(`cp ${path.join(__dirname, 'entities', 'BasicRouter.ts')} src/routes/BasicRouter.ts`);

    log('Available npm scripts:');
    shelljs.exec('npm run');
  } catch (e) {
    err(e);
  }
};


module.exports = {
  createService,
};
