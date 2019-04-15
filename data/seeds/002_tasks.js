exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    {
      name: "task",
      user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
      desc: "task description",
      "yyyy-mm-dd": "2019-04-15",
      //time: new Date().toISOString(),
      repeat: true
    },
    {
      name: "task2",
      user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
      desc: "new task desc for task 2",
      "yyyy-mm-dd": "2019-05-02",
      //time: new Date().toISOString(),
      repeat: true
    },
    {
      name: "task3",
      user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
      desc: "desc for task 3 going here",
      "yyyy-mm-dd": "2020-04-15",
      //time: new Date().toISOString(),
      repeat: true
    }
  ]);
};
