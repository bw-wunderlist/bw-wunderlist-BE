const express = require("express");
const userModel = require("./userModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.decoded.subject;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  const id = req.decoded.subject;
  try {
    const update = await userModel.updateById(req.body, id);
    res.status(204).json(update);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
