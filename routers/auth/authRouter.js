const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../auth/secrets.js").jwtSecret;

const db = require("../../data/dbConfig.js");

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

router.post("/register", async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
});

module.exports = router;
