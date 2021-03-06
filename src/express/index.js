'use strict';

const express = require(`express`);
const path = require(`path`);
const offerRoutes = require(`./routes/offer-routes.js`);
const mainRoutes = require(`./routes/main-routes.js`);
const myRoutes = require(`./routes/my-routes.js`);
const HttpCode = require(`../constants.js`).HttpCode;


const DEFAULT_PORT = 8081;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;
const app = express();

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(`/offers`, offerRoutes);
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use((_req, res, _next) => {
  res.status(HttpCode.NOT_FOUND).render(`errors/404`);
});
app.use((_err, _req, res, _next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Server runs on port: ${DEFAULT_PORT}`);
});
