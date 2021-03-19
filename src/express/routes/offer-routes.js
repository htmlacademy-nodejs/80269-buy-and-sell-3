'use strict';

const {Router} = require(`express`);


const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`);
});
offersRouter.get(`/add`, (req, res) => {
  res.render(`new-ticket`);
});
offersRouter.get(`/edit/:id`, (req, res) => {
  res.render(`ticket-edit`);
  // res.send(`/offers/edit/${req.params.id}`);
});
offersRouter.get(`/:id`, (req, res) => {
  res.render(`ticket`);
  // res.send(`/offers/${req.params.id}`);
});

module.exports = offersRouter;
