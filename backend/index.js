const express = require("express");
require("dotenv").config();
const consign = require("consign");
const app = express();
const port = 3000;

consign()
  .then("./config/middlewares.js")
  .then("./controller")
  .then("./config/router.js")
  .into(app);

app.listen(port, () => {
  console.log("Backend executando...");
});
