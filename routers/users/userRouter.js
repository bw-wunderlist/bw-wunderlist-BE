const express = require("express");

const router = express.Router();

const db = require("../../data/dbConfig");

router.get('/', async (req, res) => {
  const id = req.decoded.subject
  try {
    const users = await db('users').where({uid: id}).select('username', 'email', 'imageUrl').first();
    res.status(200).json(users)
  } catch(err) {
    res.status(500).json(err)
  }
})


module.exports = router;