const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const beatRouter = require("./routes/beatRoutes");
const userRouter = require("./routes/userRoutes");
const trackRouter = require("./routes/trackRoutes");
const billingRouter = require("./routes/billingRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/v1/beats", beatRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tracks", trackRouter);
app.use("/api/v1/billings", billingRouter);
app.use("/api/v1/purchases", purchaseRouter);

module.exports = app;
