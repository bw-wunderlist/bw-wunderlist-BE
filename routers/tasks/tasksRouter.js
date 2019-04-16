const express = require("express");

const router = express.Router();

const Tasks = require("./tasksModel");

const moment = require("moment");

// GET ALL TASKS BY USERS ID
router.get("/", async (req, res) => {
  const id = req.decoded.subject;
  try {
    const tasks = await Tasks.getAllByUserId(id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SINGLE TASK BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.decoded.subject;
  try {
    const task = await Tasks.getById(id);
    if (task) {
      if (task.user_id === userId) {
        res.status(200).json({
          id: task.id,
          name: task.name,
          desc: task.desc,
          is_complete: task.is_complete,
          due_date: task.due_date,
          repeat: task.repeat,
          repeat_condition: task.repeat_condition,
          occurred: task.occurred
        });
      } else {
        res.status(405).json({ message: "Not Your Task" });
      }
    } else {
      res.status(404).json({ message: "Task Not Found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/complete/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.decoded.subject;
  try {
    const task = await Tasks.getById(id);
    if (task) {
      if (task.user_id === userId) {
        if (task.repeat) {
          const repeatCondition = JSON.parse(task.repeat_condition);
          if (task.occurred >= repeatCondition.occurrences) {
            await Tasks.completeById(id, task.is_complete);
            res.status(200).json({
              message: `Task is ${
                !task.is_complete ? "complete" : "not complete"
              }`
            });
          } else {
            let newDate = 0;
            newDate = moment.unix(task.due_date).add(repeatCondition.number, repeatCondition.timeframe).unix();
            while(newDate < moment().unix()) {
              newDate = moment.unix(newDate).add(repeatCondition.number, repeatCondition.timeframe).unix();
            }
            let timesOccured = task.occurred + 1;
            await Tasks.updateTask(
              id,
              { due_date: newDate, occurred: timesOccured },
              userId
            );
            res
              .status(200)
              .json({
                message: "Task Repeated",
                is_complete: task.is_complete,
                nextTime: newDate,
                occurred: timesOccured
              });
          }
        } else {
          await Tasks.completeById(id, task.is_complete);
          res.status(200).json({
            message: `Task is ${
              !task.is_complete ? "complete" : "not complete"
            }`
          });
        }
      } else {
        res.status(401).json({ message: "Not Your Task" });
      }
    } else {
      res.status(404).json({ message: "Task Not Found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD TASK
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const task = await Tasks.addTask(data, req.decoded.subject);
    res.status(201).json({ message: "Task Created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.updateTask(
      req.params.id,
      req.body,
      req.decoded.subject
    );
    if (task) {
      res.status(200).json({ message: "Task has been updated" });
    } else {
      res.status(404).json({ message: `No task for that ID... sorry` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.removeTask(id, req.decoded.subject);
    if (task) {
      res.status(200).json({ message: `Task has been deleted!` });
    } else {
      res.status(404).json({ message: `No task found for that ID` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
