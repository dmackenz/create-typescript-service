const chalk = require('chalk');

module.exports = {
  log: (str) => {
    console.log(chalk.blue(str));
  },
  err: (err) => {
    console.log(chalk.red(err));
  },
};
