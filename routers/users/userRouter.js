const express = require("express");
const userModel = require("./userModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.decoded.subject;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  const id = req.decoded.subject;
  try {
    const update = await userModel.updateById(req.body, id);
    if (update > 0) {
      res.status(200).json({ message: `The user has been updated! ${update}` });
    } else {
      res.status(404).json({ message: `Bad request, nothing updated!` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

router.delete("/", async (req, res) => {
  const id = req.decoded.subject;
  const username = req.decoded.username;
  const remove = await userModel.removeUser(id);
  try {
    res.status(200).json({ message: `user removed! ${username}` });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
