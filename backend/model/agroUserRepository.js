module.exports = {
  selectAll(app, table) {
    return app.db(table);
  },

  selectBy(app, table, attr, value) {
    return app.db(table).where(attr, value);
  },

  insert(app, table, obj) {
    return app.db(table).insert(obj);
  },

  delete(app, table, attr, value) {
    return app.db(table).where(attr, value).first().del();
  },

  update(app, table, attr, value, obj) {
    return app.db(table).where(attr, value).first().update(obj);
  },
};
