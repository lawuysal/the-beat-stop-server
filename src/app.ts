import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import beatRouter from "./routes/beatRoutes";
import userRouter from "./routes/userRoutes";
import trackRouter from "./routes/trackRoutes";
import billingRouter from "./routes/billingRoutes";
import purchaseRouter from "./routes/purchaseRoutes";
import globalErrorHandler from "./controllers/errorControllers";

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/dev-data`));

app.use("/api/v1/beats", beatRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tracks", trackRouter);
app.use("/api/v1/billings", billingRouter);
app.use("/api/v1/purchases", purchaseRouter);

// Error Handler Middleware
app.use(globalErrorHandler);

export default app;
