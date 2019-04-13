exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    { name: "task", user_id: 1 },
    { name: "rowValue2", user_id: 1 },
    { name: "rowValue3", user_id: 2 }
  ]);
};
