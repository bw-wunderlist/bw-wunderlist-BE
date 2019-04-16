const request = require("supertest");
const db = require("../../data/dbConfig.js");
const server = require("../../api/server.js");
const Tasks = require("./tasksModel.js");

describe(`tasksModel`, () => {
  afterEach(async () => {
    await db("tasks").truncate();
  });

  describe(`getAllByUserId`, () => {
    it(`should get id, name, desc, is_complete`, async () => {
      await Tasks.addTask({ name: "test task" }, "DnuzdSXCtMgmRWDCRRE1iQ");
      const tasks = await Tasks.getAllByUserId("DnuzdSXCtMgmRWDCRRE1iQ");
      console.log(tasks);
      expect(tasks).toHaveLength(1);
    });
  });
});
