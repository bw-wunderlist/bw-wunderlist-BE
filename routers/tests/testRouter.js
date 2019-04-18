const express = require("express");

const router = express.Router();

const db = require("../../data/dbConfig");

router.get("/users", async (req, res) => {
  try {
    const users = await db("users");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const users = await db("tasks");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await db("tasks");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
