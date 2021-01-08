'use strict';


const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);


const DEFAULT_PORT = 3000;


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const onClientConnect = () => {

    };

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера: ${err}`));
        }

        return console.log(chalk.green(`Ожидаю соединений на порт #${port}`));
      });
  }
};
