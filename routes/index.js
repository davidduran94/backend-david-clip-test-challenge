const express = require("express");

const customersRouter = require("./customers.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/customers", customersRouter);
}

module.exports = routerApi;
