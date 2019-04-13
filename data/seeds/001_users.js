const bcrypt = require("bcryptjs");
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);
exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      uid: uidgen.generateSync(),
      username: "Jon",
      password: bcrypt.hashSync("qwerty"),
      email: "jon@google.com",
      imageUrl: "urlGoesHere"
    },
    {
      uid: uidgen.generateSync(),
      username: "Kelly",
      password: bcrypt.hashSync("ytrewq"),
      email: "kelly@amazon.com",
      imageUrl: "urlGoesHere"
    },
    {
      uid: uidgen.generateSync(),
      username: "Kevin",
      password: bcrypt.hashSync("pasta"),
      email: "kevin@test.com",
      imageUrl: "urlGoesHere"
    }
  ]);
};
