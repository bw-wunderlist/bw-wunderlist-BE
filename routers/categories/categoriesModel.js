const db = require("../../data/dbConfig.js");

module.exports = {
  getAllCategoriesById,
  getCategoryById
};

function getAllCategoriesById(id) {
  return db("tasks")
    .where({ user_id: id })
    .select("id", "name", "categories");
}

function getCategoryById(id) {
  return db("tasks")
    .where({ id: id })
    .first();
}
