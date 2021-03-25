'use strict';

const express = require(`express`);
const {readFile} = require(`fs`).promises;
const HttpCode = require(`../../constants`).HttpCode;


const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found!`;


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/offers`, async (_req, res) => {
      try {
        const fileContent = await readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(fileContent.length ? mocks : []);
      } catch (err) {
        res.json([]);
      }
    });

    app.use((_req, res, _next) => res
      .status(HttpCode.NOT_FOUND)
      .send(NOT_FOUND_MESSAGE)
    );

    app.listen(port, () => {
      console.log(`Server runs on port: ${port}`);
    });
  },
};
