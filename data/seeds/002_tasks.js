exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    { name: "task", user_id: "DnuzdSXCtMgmRWDCRRE1iQ" },
    { name: "task2", user_id: "DnuzdSXCtMgmRWDCRRE1iQ" },
    { name: "task3", user_id: "DnuzdSXCtMgmRWDCRRE1iQ" }
  ]);
};
