const db = require("../../data/dbConfig.js");
const Tasks = require("./tasksModel.js");

const moment = require("moment");

describe(`tasksModel`, () => {
  afterEach(async () => {
    await db("tasks").truncate();
  });

  describe(`getAllByUserId`, () => {
    it(`should get id, name, desc, is_complete`, async () => {
      await Tasks.addTask({ name: "test task" }, "DnuzdSXCtMgmRWDCRRE1iQ");
      const tasks = await Tasks.getAllByUserId("DnuzdSXCtMgmRWDCRRE1iQ");
      expect(tasks).toHaveLength(1);
    });
  });

  describe(`getById`, () => {
    it("should get back single task matching id", async () => {
      const taskId = await Tasks.addTask(
        { name: "testing" },
        "DnuzdSXCtMgmRWDCRRE1iQ"
      );
      const tasks = await Tasks.getById(taskId[0]);
      expect(tasks).toBeDefined();
    });
  });

  describe("addTask", () => {
    it(`should add a task`, async () => {
      await Tasks.addTask({ name: "addtask test" }, "DnuzdSXCtMgmRWDCRRE1iQ");
      const tasks = await Tasks.getAllByUserId("DnuzdSXCtMgmRWDCRRE1iQ");
      expect(tasks).toHaveLength(1);
    });
  });

  describe("completeById", () => {
    it("should mark task completed", async () => {
      const taskId = await Tasks.addTask(
        { name: "task name" },
        "DnuzdSXCtMgmRWDCRRE1iQ"
      );
      let task = await Tasks.getById(taskId[0]);
      expect(task.is_complete).toEqual(0);
      await Tasks.completeById(taskId[0], task.is_complete);
      task = await Tasks.getById(taskId[0]);
      expect(task.is_complete).toEqual(1);
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      const taskId = await Tasks.addTask(
        { name: "tesing task1" },
        "DnuzdSXCtMgmRWDCRRE1iQ"
      );
      console.log(taskId);
      let task = await Tasks.updateTask(
        taskId[0],
        { name: "update" },
        "DnuzdSXCtMgmRWDCRRE1iQ"
      );
      console.log(task);
      task = await Tasks.getById(taskId[0]);
      console.log(task);
      expect(task.name).toEqual("update");
    });
  });

  describe("removeTask", () => {
    it.skip("should remove task", async () => {
      await Tasks.removeTask();
    });
  });

  describe(`Test Date Adder`, () => {
    it("add 1 day to current date", async () => {
      const newDate = await Tasks.addToRepeat(moment().unix(), {
        number: 1,
        timeframe: "days"
      });
      expect(newDate).toBe(
        moment()
          .add(1, "days")
          .unix()
      );
    });

    it("add days until future", async () => {
      const input = moment()
        .subtract(1, "hours")
        .unix();
      const newDate = await Tasks.addToRepeat(
        moment
          .unix(input)
          .subtract(5, "days")
          .unix(),
        { number: 1, timeframe: "days" }
      );
      expect(newDate).toBe(
        moment
          .unix(input)
          .add(1, "days")
          .unix()
      );
    });
  });
});
