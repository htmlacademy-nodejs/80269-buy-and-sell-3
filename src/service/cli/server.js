'use strict';


const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);


module.exports = {
  name: `--server`,
  run(args) {
    console.log(`server command`);
  }
};
