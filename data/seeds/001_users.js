const bcrypt = require("bcryptjs");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);

const faker = require("faker");

const person = {
  uid: uidgen.generateSync(),
  username: faker.internet.userName().toLowerCase(),
  password: bcrypt.hashSync(faker.internet.password()),
  email: faker.internet.email(),
  imageUrl: faker.internet.avatar()
};

const people = [];

for (let i = 0; i < 100; i++) {
  people.push({
    uid: uidgen.generateSync(),
    username: faker.internet.userName(),
    password: bcrypt.hashSync(faker.internet.password()),
    email: faker.internet.email(),
    imageUrl: faker.internet.avatar()
  });
}

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      uid: "DnuzdSXCtMgmRWDCRRE1iQ",
      username: "jon",
      password: bcrypt.hashSync("qwerty"),
      email: "jon@google.com",
      imageUrl: "https://randomuser.me/api/portraits/women/73.jpg"
    },
    {
      uid: uidgen.generateSync(),
      username: "kelly",
      password: bcrypt.hashSync("ytrewq"),
      email: "kelly@amazon.com",
      imageUrl: "https://randomuser.me/api/portraits/women/34.jpg"
    },
    {
      uid: uidgen.generateSync(),
      username: "kevin",
      password: bcrypt.hashSync("pasta"),
      email: "kevin@ubilink.com",
      imageUrl: "https://randomuser.me/api/portraits/men/21.jpg"
    },
    ...people
  ]);
};
