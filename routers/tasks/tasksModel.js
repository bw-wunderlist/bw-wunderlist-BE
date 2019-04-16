const db = require("../../data/dbConfig.js");

module.exports = {
  getAllByUserId,
  getById,
  addTask,
  updateTask,
  removeTask,
  completeById
};

function getAllByUserId(id) {
  return db("tasks")
    .where({ user_id: id })
    .select("id", "name", "desc", "is_complete", "due_date", "repeat", "repeat_condition", "occurred");
}

function getById(id) {
  return db("tasks")
    .where({ id: id })
    .first();
}

function addTask(task, userId) {
  return db("tasks").insert({...task, repeat_condition: JSON.stringify(task.repeat_condition), user_id: userId });
}

function completeById(id, currentStatus) {
  return db("tasks")
    .where({ id })
    .update({ is_complete: !currentStatus });
}

function updateTask(id, taskChanges, uid) {
  return db("tasks")
    .where({ id: id, user_id: uid })
    .update({ ...taskChanges });
}

function removeTask(id, userId) {
  return db("tasks")
    .where({ id: id, user_id: userId })
    .del();
}
