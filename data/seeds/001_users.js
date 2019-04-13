const bcrypt = require("bcryptjs");
exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "Jon",
      password: bcrypt.hashSync("qwerty"),
      email: "jon@google.com",
      imageUrl: "urlGoesHere"
    },
    {
      username: "Kelly",
      password: bcrypt.hashSync("ytrewq"),
      email: "kelly@amazon.com",
      imageUrl: "urlGoesHere"
    },
    {
      username: "Kevin",
      password: bcrypt.hashSync("pasta"),
      email: "kevin@test.com",
      imageUrl: "urlGoesHere"
    }
  ]);
};
