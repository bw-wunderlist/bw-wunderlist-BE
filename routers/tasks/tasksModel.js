const db = require("../../data/dbConfig.js");

const moment = require("moment");

module.exports = {
  getAllByUserId,
  getById,
  addTask,
  updateTask,
  removeTask,
  completeById,
  addToRepeat,
  removeTaskCompleted
};

function getAllByUserId(id) {
  return db("tasks")
    .where({ user_id: id })
    .select(
      "id",
      "name",
      "desc",
      "is_complete",
      "due_date",
      "repeat",
      "repeat_condition",
      "occurred",
      "categories"
    ).orderBy('name', 'asc');
}

function getById(id) {
  return db("tasks")
    .where({ id: id })
    .first();
}

function addTask(task, userId) {
  return db("tasks").insert({
    ...task,
    repeat_condition: JSON.stringify(task.repeat_condition),
    user_id: userId
  });
}

function completeById(id, currentStatus) {
  return db("tasks")
    .where({ id })
    .update({ is_complete: !currentStatus })
    .returning("*");
}

function updateTask(id, taskChanges, uid) {
  return db("tasks")
    .where({ id: id, user_id: uid })
    .update({ ...taskChanges })
    .returning("*");
}

function removeTask(id, userId) {
  return db("tasks")
    .where({ id: id, user_id: userId })
    .del();
}

function removeTaskCompleted(userId) {
  return db("tasks")
    .where({ user_id: userId, is_complete: true })
    .del();
}

function addToRepeat(dueDate, repeatCondition) {
  let newDate = 0;
  newDate = moment
    .unix(dueDate)
    .add(repeatCondition.number, repeatCondition.timeframe)
    .unix();
  while (newDate < moment().unix()) {
    newDate = moment
      .unix(newDate)
      .add(repeatCondition.number, repeatCondition.timeframe)
      .unix();
  }
  return newDate;
}
