const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets.js").jwtSecret;

const db = require("../data/dbConfig.js");
const Users = require("./user-model.js");

const { authenticate } = require("../auth/authenticate.js");

const router = express.Router();

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  return jwt.sign(payload, secret, options);
}

async function register(req, res) {
  // implement user registration
  const regData = req.body;
  if (!regData.username || !regData.password) {
    res.Status(400).json({ message: `Must provide all Info. Bad Request` });
  }
  try {
    const cantHaveName = await db("users")
      .where({ username: regData.username })
      .first();
    if (cantHaveName) {
      res
        .status(401)
        .json({ message: `Username is already spoken for! Please try again` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
  const hash = bcrypt.hashSync(regData.password, 12);
  regData.password = hash;
  try {
    const userID = await db("users").insert(regData);
    const token = generateToken(userID);
    res.status(201).json({ userID, token });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
}

async function login(req, res) {
  // implement user login
  const loginData = req.body;
  if (!loginData.username || !loginData.password) {
    res
      .status(400)
      .json({ message: `must provide username and password, bad request` });
  }
  try {
    const user = await db("users")
      .where({ username: loginData.username })
      .first();
    if (user && bcrypt.compareSync(loginData.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: `Not happening!` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
}

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

//router.post('/', register, async (req, res) => {

//})

module.exports = router;
