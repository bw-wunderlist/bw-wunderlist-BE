exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string('desc', 255);
    tbl.date('due_date')
    tbl.boolean('is_complete').defaultTo(false);
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
