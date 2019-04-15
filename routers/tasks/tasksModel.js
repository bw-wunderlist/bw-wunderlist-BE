const db = require("../../data/dbConfig.js");

module.exports = {
  getAllByUserId,
  getById,
  addTask
};

function getAllByUserId(id) {
  return db("tasks")
    .where({ user_id: id })
    .select("id", "name", "desc", "is_complete");
}

function getById(id) {
  return db("tasks").where({ id: id }).first();
}

function addTask(task, userId) {
  return db("tasks").insert({ ...task, user_id: userId });
}
