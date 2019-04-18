const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../auth/secrets.js').jwtSecret;
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);

const db = require('../../data/dbConfig.js');

const router = express.Router();

function generateToken(user) {
  const payload = {
    subject: user.uid,
    username: user.username,
  };
  const options = {
    expiresIn: '24h',
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', async (req, res) => {
  const lowerCase = req.body.username.toLowerCase();
  console.log(lowerCase);
  let regData = {...req.body, username: lowerCase};
  console.log(regData);
  if (!regData.username || !regData.password) {
    res.Status(400).json({message: `Must provide all Info. Bad Request`});
  }
  try {
    const cantHaveName = await db('users')
      .where({username: regData.username})
      .first();
    if (cantHaveName) {
      res
        .status(401)
        .json({message: `Username is already spoken for! Please try again`});
    }
  } catch (err) {
    res.status(500).json({message: `Internal Error, ${err}`});
  }
  const hash = bcrypt.hashSync(regData.password, 12);
  regData.password = hash;
  regData.uid = uidgen.generateSync();
  try {
    await db('users').insert(regData);
    await db('tasks').insert({
      name: 'Welcome to Wunderlist',
      desc: 'Using Wunderlist is really easy just make a task and see.',
      user_id: regData.uid,
      due_date: 0,
      repeat: false,
      repeat_condition: {number: 0, timeframe: 'days', occurrences: 0},
    });
    const user = {uid: regData.uid, username: regData.username};
    const token = generateToken(user);
    res.status(201).json({token});
  } catch (err) {
    res.status(500).json({message: `Internal Error, ${err}`});
  }
});

router.post('/login', async (req, res) => {
  const lowerCase = req.body.username.toLowerCase();
  console.log(lowerCase);
  let loginData = {...req.body, username: lowerCase};
  console.log(loginData);
  if (!loginData.username || !loginData.password) {
    res
      .status(400)
      .json({message: `must provide username and password, bad request`});
  }
  try {
    const user = await db('users')
      .where({username: loginData.username})
      .first();
    if (user && bcrypt.compareSync(loginData.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({message: `Welcome ${user.username}`, token});
    } else {
      res.status(401).json({message: `Not happening!`});
    }
  } catch (err) {
    res.status(500).json({message: `Internal Error, ${err}`});
  }
});

module.exports = router;
