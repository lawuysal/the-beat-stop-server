const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const beatRouter = require("./routes/beatRoutes");
const userRouter = require("./routes/userRoutes");
const trackRouter = require("./routes/trackRoutes");
const billingRouter = require("./routes/billingRoutes");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
//app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/beats", beatRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tracks", trackRouter);
app.use("/api/v1/billings", billingRouter);

module.exports = app;
