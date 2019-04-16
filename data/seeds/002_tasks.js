const moment = require('moment')

const repeatIt = JSON.stringify({
  number: 1,
  timeframe: "days",
  occurrences: 5,
})

exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    {
      name: "task",
      user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
      desc: "task description",
      due_date: moment().add(1,'day').unix(),
      repeat: true,
      repeat_condition: repeatIt
    },
    {
      name: "task2",
      user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
      desc: "new task desc for task 2",
      due_date: moment().add(3,'day').unix(),
      repeat: true,
      repeat_condition: repeatIt
    },
    {
      name: "task3",
      user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
      desc: "desc for task 3 going here",
      due_date: moment().add(10,'day').unix(),
      repeat: 1,
      repeat_condition: "test"
    }
  ]);
};
