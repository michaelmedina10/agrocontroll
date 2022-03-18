const db = require("../config/db");
const table = "agrousers";
module.exports = {
  selectAll() {
    return db(table);
  },

  getByEmail(email) {
    return db(table).where({ email }).first();
  },

  getById(id) {
    return db(table).where({ id }).first();
  },

  insert(user) {
    return db(table).insert(user);
  },

  delete(id) {
    return db(table).where({ id }).first().del();
  },

  update(id, attrs) {
    return db(table).where({ id }).first().update(attrs);
  },
  amountPesticida() {
    return db(table)
      .select("pesticida", db.raw("count(pesticida) as quantidade"))
      .groupBy("pesticida");
  },

  amountState() {
    return db(table)
      .select("estado", db.raw("count(estado) as quantidade"))
      .groupBy("estado");
  },
};
