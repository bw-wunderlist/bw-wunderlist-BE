const db = require("../../data/dbConfig.js");
const Tasks = require("./tasksModel.js");

const moment = require('moment')

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
      const taskId = await Tasks.addTask({ name: "testing" }, "DnuzdSXCtMgmRWDCRRE1iQ");
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

  describe(`Test Date Adder`, () => {
    it('add 1 day to current date', async () => {
      const newDate = await Tasks.addToRepeat(moment().unix(), {number: 1, timeframe: "days"});
      expect(newDate).toBe(moment().add(1, 'days').unix())
    })

    it('add days until future', async () => {
      const input = moment().subtract(1, 'hours').unix()
      const newDate = await Tasks.addToRepeat(moment.unix(input).subtract(5, 'days').unix(), {number: 1, timeframe: "days"});
      expect(newDate).toBe(moment.unix(input).add(1, 'days').unix())
    })
  })
});