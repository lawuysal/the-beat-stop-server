import process from "process";

process.on("uncaughtException", (err) => {
  console.log(err.name, " - ", err.message);

  process.exit(1);
});

import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";

// This method must be called before the app decleration!!!
dotenv.config({ path: "./config.env" });
import app from "./app";

const server = http.createServer(app);

const dbConnectionString = process.env.DB_CON_STR
  ? process.env.DB_CON_STR.replace("<PASSWORD>", process.env.DB_PASS ?? "")
  : "";

mongoose.connect(dbConnectionString).then(() => {
  console.log("Connected to DB");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Started to listening at ${port}...`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, " - ", err.message);

  // Shutting down the server gracefully
  server.close(() => {
    process.exit(1);
  });
});
