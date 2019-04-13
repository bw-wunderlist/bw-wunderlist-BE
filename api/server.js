const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// AUTHENTICATION IMPORT
const { authenticate } = require("../auth/authenticate.js");

// ROUTER IMPORTS
//const registerRouter = require('../register/registerRouter.js')
//const loginRouter = require('../')
const authRouter = require("../routers/auth/authRouter.js");

const server = express();

//MIDDLEWARE
server.use(express.json());
server.use(cors());
server.use(helmet());

// ROUTERS
server.use("/api/auth", authRouter);
// server.use("/api/tasks", authenticate, tasksRouter);

//  GET ENDPOINT FOR /
server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
