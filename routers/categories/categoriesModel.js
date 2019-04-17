const db = require("../../data/dbConfig.js");

module.exports = {
  getAllCategoriesById
};

function getAllCategoriesById(id) {
  return db("tasks")
    .where({ user_id: id })
    .select("id", "name", "categories");
}
