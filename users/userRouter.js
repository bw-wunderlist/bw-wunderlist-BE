const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/dbConfig.js");
const Users = require("./user-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
