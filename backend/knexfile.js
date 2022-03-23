// const { content } = require("./.env");
require("dotenv").config();
const { host, port, user, password, database } = process.env;
console.log(process.env.user);
// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql",
  connection: { host, port, user, password, database },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
