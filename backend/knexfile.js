// Esse import é necessário para o caso de executar o knex sozinho, sem o index.js
// se deixassémos somente lá o import, esse arquivo não conseguiria ler o .env
require("dotenv").config();
const { host, port, user, password, database } = process.env;
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
