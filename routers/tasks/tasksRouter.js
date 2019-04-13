const express = require("express");

const router = express.Router();

const tasks = require('./tasksModel')

router.get('/:id', async (req, res) => {
  const {id} = req.params
  try{
    const tasks = await tasks.getTaskById(id)
    res.status(200).json(tasks)
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;