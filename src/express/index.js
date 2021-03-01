'use strict';

const express = require(`express`);
const path = require(`path`);
const offerRoutes = require(`./routes/offer-routes.js`);
const mainRoutes = require(`./routes/main-routes.js`);
const myRoutes = require(`./routes/my-routes.js`);


const DEFAULT_PORT = 8081;
const PUBLIC_DIR = `public`;
const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(`/offers`, offerRoutes);
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server runs on port: ${DEFAULT_PORT}`);
});
