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
    tbl.string("imageUrl", 255).defaultTo('https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjl1bHJ4c3hAhUJvlkKHY0UAaYQjRx6BAgBEAU&url=https%3A%2F%2Fimmedilet-invest.com%2Fteam%2Fdanny-inman%2Fuser-placeholder%2F&psig=AOvVaw36xLcwYvNGkDbL48Ud-zU9&ust=1555268707570339')
    //tbl.timestamps("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
