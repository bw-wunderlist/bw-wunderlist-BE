const db = require("../../data/dbConfig.js");

module.exports = {
  findById
};

function findById(id) {
  return db("users")
    .where({ uid: id })
    .select("username", "email", "imageUrl")
    .first();
}

function updateById(data, id) {
  return db("users")
    .where({ uid: id })
    .update({ ...data });
}
