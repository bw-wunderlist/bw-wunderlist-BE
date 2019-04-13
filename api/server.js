const express = require("express");
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')

// DB IMPORT
const db = require("../data/dbConfig.js");
// ROUTER IMPORTS
const usersRouter = require('../users/userRouter.js')

const server = express();

//MIDDLEWARE
server.use(express.json());
server.use(cors())
server.use(helmet())

// ROUTERS
server.use('/api/users', usersRouter )

//  GET ENDPOINT FOR /
server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
