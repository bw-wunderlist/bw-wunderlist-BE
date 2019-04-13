const bcrypt = require("bcryptjs");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);
exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      uid: "DnuzdSXCtMgmRWDCRRE1iQ",
      username: "Jon",
      password: bcrypt.hashSync("qwerty"),
      email: "jon@google.com",
      imageUrl: "https://randomuser.me/api/portraits/women/73.jpg"
    },
    {
      uid: uidgen.generateSync(),
      username: "Kelly",
      password: bcrypt.hashSync("ytrewq"),
      email: "kelly@amazon.com",
      imageUrl: "https://randomuser.me/api/portraits/women/34.jpg"
    },
    {
      uid: uidgen.generateSync(),
      username: "Kevin",
      password: bcrypt.hashSync("pasta"),
      email: "kevin@ubilink.com",
      imageUrl: "https://randomuser.me/api/portraits/men/21.jpg"
    }
  ]);
};
