const express = require("express");

const router = express.Router();

const Tasks = require("./tasksModel");

router.get("/", async (req, res) => {
  const id = req.decoded.subject;
  try {
    const tasks = await Tasks.getAllByUserId(id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.decoded.subject;
  try {
    const task = await Tasks.getById(id);
    if (task) {
      if (task.user_id === userId) {
        res.status(200).json({id: task.id, name: task.name, is_complete: task.is_complete});
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

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const task = await Tasks.addTask(data, req.decoded.subject);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {});

module.exports = router;
