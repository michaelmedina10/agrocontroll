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
};
