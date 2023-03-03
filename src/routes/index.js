const express = require("express");
const controller = require("../controllers/transaction");
const Router = express.Router();

Router.get("/ping", (request, response) => {
  response.status(200).send("Hello World!");
});

Router.post("/transaction/:customer_id", controller.addTransaction);

module.exports = Router;
