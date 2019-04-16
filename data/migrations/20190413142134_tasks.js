exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("desc", 255);
    tbl.boolean("is_complete").defaultTo(false);
    tbl.integer("due_date");
    tbl.boolean("repeat").defaultTo(false);
    tbl.json('repeat_condition');
    tbl.integer('occurred').defaultTo(0);
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
