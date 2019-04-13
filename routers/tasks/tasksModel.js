const db = require("../../data/dbConfig.js");

module.exports = {
  getAllByUserId,
  getById,
  addTask
};

function getAllByUserId(id) {
  return db("tasks").where({ user_id: id });
}

function getById(id, userId) {
  return db("tasks").where({ id: id, user_id: userId });
}

function addTask(task, userId){
  return db("tasks").insert({...task, user_id: userId});
}