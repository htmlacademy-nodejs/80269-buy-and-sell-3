'use strict';

const express = require(`express`);

const DEFAULT_PORT = 8080;

const app = express();

app.listen(DEFAULT_PORT, () => {
  console.log(`Server runs on port: ${DEFAULT_PORT}`);
});
