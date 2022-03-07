/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("agrousers", function (table) {
    table.increments("id").primary();
    table.string("nome").notNull();
    table.string("estado").notNull();
    table.string("email").notNull().unique();
    table.integer("idade").notNull();
    table.string("pesticida").notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("agrousers");
};
