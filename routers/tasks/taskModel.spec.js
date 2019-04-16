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

  describe(`getById`, () => {
    it("should get back single task matching id", async () => {
      await Tasks.addTask({ name: "testing" }, "DnuzdSXCtMgmRWDCRRE1iQ");
      const tasks = await Tasks.getById("DnuzdSXCtMgmRWDCRRE1iQ");
      console.log(tasks);
      expect(tasks).toBeDefined();
    });
  });

  describe("addTask", () => {
    it.skip(`should add a task`, async () => {
      await Tasks.addTask({ name: "addtask test" }, "DnuzdSXCtMgmRWDCRRE1iQ");
      const tasks = await Tasks.getAllByUserId("DnuzdSXCtMgmRWDCRRE1iQ");
      console.log(tasks);
      expect(tasks).toHaveLength(1);
    });
  });

  describe("completeById", () => {
    it.skip("should mark task completed", async () => {
      console.log("test will go here");
    });
  });

  describe("updateTask", () => {
    it.skip("should update a task", async () => {
      await Tasks.updateTask();
    });
  });

  describe("removeTask", () => {
    it.skip("should remove task", async () => {
      await Tasks.removeTask();
    });
  });
});

//TODO: need to fix seeding and migrations to complete testing.
