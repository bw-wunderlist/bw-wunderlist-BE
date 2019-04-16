const moment = require('moment')
const faker = require("faker");

const repeatIt = JSON.stringify({
  number: 1,
  timeframe: "days",
  occurrences: 5,
})

const tasks = []

for (let i = 0; i < 100; i++) {
  tasks.push({
    name: faker.commerce.productName(),
    desc: faker.lorem.sentence(),
    user_id: "DnuzdSXCtMgmRWDCRRE1iQ",
    due_date: moment(faker.date.future()).unix(),
    repeat: faker.random.boolean(),
    repeat_condition: JSON.stringify({
      number: Math.floor((Math.random() * 365) + 1),
      timeframe: 'days',
      occurrences: Math.floor((Math.random() * 20) + 1),
    })
  })
}

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
    },
  ]);
};
