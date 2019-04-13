const express = require("express");

const router = express.Router();

const db = require("../../data/dbConfig");

router.get('/', async (req,res) => {
  try {
    const users = await db('users')
    res.status(200).json(users)
  } catch(err) {
    res.status(500).json(err)
  }
})


module.exports = router;