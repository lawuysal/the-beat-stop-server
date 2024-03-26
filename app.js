const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const beatRouter = require("./routes/beatRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
//app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/beats", beatRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
