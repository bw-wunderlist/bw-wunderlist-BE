exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 128)
      .notNullable()
      .unique("username");
    tbl.string("password", 128).notNullable();
    tbl
      .string("email", 128)
      .notNullable()
      .unique("email");
    tbl.timestamps();
    tbl.string("imageUrl", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
