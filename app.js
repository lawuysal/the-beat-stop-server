const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

module.exports = app;
