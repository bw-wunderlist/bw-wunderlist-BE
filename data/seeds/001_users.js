//const bcrypt = require('bcryptjs')
exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "Jon",
      password: "qwerty",
      email: "jon@google.com",
      imageUrl: "urlGoesHere"
    },
    {
      username: "Kelly",
      password: "ytrewq",
      email: "kelly@amazon.com",
      imageUrl: "urlGoesHere"
    },
    {
      username: "Kevin",
      password: "pasta",
      email: "kevin@test.com",
      imageUrl: "urlGoesHere"
    }
  ]);
};
