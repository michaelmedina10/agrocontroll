const db = require("../config/db");
const table = "users";
module.exports = {
  selectAll() {
    return db(table);
  },

  getById(id) {
    return db(table).where({ id }).first();
  },

  getByEmail(email) {
    return db(table).where({ email }).first();
  },

  insert(user) {
    return db(table).insert(user);
  },

  delete(id) {
    return db(table).where({ id }).first().del();
  },
  update(id, attrs) {
    return db(table).where({ id }).update(attrs);
  },
};
