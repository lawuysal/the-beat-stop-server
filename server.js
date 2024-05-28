process.on("uncaughtException", (err) => {
  console.log(err.name, " - ", err.message);

  process.exit(1);
});

const dotenv = require("dotenv");
const mongoose = require("mongoose");

// This method must be called before the app decleration!!!
dotenv.config({ path: "./config.env" });
const app = require("./app.js");

const dbConnectionString = process.env.DB_CON_STR.replace(
  "<PASSWORD>",
  process.env.DB_PASS
);

mongoose.connect(dbConnectionString).then((con) => {
  console.log("Connected to DB");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Started to listening at ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, " - ", err.message);

  // Shutting down the server gracefully
  server.close(() => {
    process.exit(1);
  });
});
