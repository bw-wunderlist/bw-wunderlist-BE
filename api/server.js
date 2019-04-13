const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// DB IMPORT
const db = require("../data/dbConfig.js");
// AUTHENTICATION IMPORT
const { authenticate } = require("../auth/authenticate.js");

// ROUTER IMPORTS
//const registerRouter = require('../register/registerRouter.js')
//const loginRouter = require('../')
const usersRouter = require("../users/userRouter.js");

const server = express();

//MIDDLEWARE
server.use(express.json());
server.use(cors());
server.use(helmet());

// ROUTERS
server.use("/api/users", register, usersRouter);

//  GET ENDPOINT FOR /
server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
