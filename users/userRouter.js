const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const bcrypt = require("bcryptjs");

const db = require("../data/dbConfig.js");
const Users = require("./user-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
