const db = require("../../data/dbConfig.js");

module.exports = {
  getTaskById
};

function getTaskById(id) {
  return db("tasks")
    .where({ user_id: id })
    .first();
}
