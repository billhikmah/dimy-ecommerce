const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const mainRouter = require("./src/routes/index");
require("dotenv").config();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

app.use("/api", mainRouter);

app.use("/*", (request, response) => {
  response.status(404).send("Page not found.");
});
