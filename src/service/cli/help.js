'use strict';

const chalk = require('chalk');


module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.grey(`
      Программа запускает http-сервер и формирует файл с данными для API.

      Использование:
        service.js <command>

      Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
    `));
  }
};
