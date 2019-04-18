const express = require("express");

const router = express.Router();

const Categories = require("./categoriesModel.js");

// GET ALL CATEGORIES BY USER ID
router.get("/", async (req, res) => {
  const id = req.decoded.subject;
  console.log(id);
  try {
    const categories = await Categories.getAllCategoriesById(id);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
