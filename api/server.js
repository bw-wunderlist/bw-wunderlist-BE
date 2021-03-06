const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// AUTHENTICATION IMPORT
const { authenticate } = require("../auth/authenticate.js");

// ROUTER IMPORTS
const authRouter = require("../routers/auth/authRouter.js");
const userRouter = require("../routers/users/userRouter");
const tasksRouter = require("../routers/tasks/tasksRouter");
const categoriesRouter = require("../routers/categories/categoriesRouter.js");
const server = express();

//MIDDLEWARE
server.use(express.json());
server.use(cors());
server.use(helmet());

// ROUTERS
server.use("/api/auth", authRouter);
server.use("/api/user", authenticate, userRouter);
server.use("/api/tasks", authenticate, tasksRouter);
server.use("/api/categories", authenticate, categoriesRouter);

if (process.env.allow_debug) {
  const testsRouter = require("../routers/tests/testRouter");
  server.use("/api/tests", testsRouter);
}
//  GET ENDPOINT FOR /
server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
