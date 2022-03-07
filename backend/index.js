const express = require("express");
const consign = require("consign");
const db = require("./config/db");

const app = express();
const port = 3000;

app.db = db;
consign()
  .then("./config/middlewares.js")
  .then("./controller")
  .then("./config/router.js")
  .into(app);

app.listen(port, () => {
  console.log("Backend executando...");
});
