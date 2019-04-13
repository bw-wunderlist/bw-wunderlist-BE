const express = require("express");

const router = express.Router();

const Tasks = require('./tasksModel')

router.get('/', async (req, res) => {
  const id = req.decoded.subject
  try{
    const tasks = await Tasks.getAllByUserId(id)
    res.status(200).json(tasks)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const task = await Tasks.getById(id, req.decoded.subject)
    if(task.length > 0) {
      res.status(200).json(task)
    }
    else {
      res.status(405).json({message: 'Not Your Task'})
    }
  } catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  const data = req.body
  try{
    const task = await Tasks.addTask(data, req.decoded.subject)
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;