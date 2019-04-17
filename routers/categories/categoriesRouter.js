const express = require("express");

const router = express.Router();

const Categories = require("./categoriesModel.js");

// GET ALL CATEGORIES BY USER ID
router.get("/", async (req, res) => {
  const id = "DnuzdSXCtMgmRWDCRRE1iQ";
  try {
    const categories = await Categories.getAllCategoriesById(id);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.decoded.subject;
  try {
    const cata = await Categories.getCategoryById(id);
    if (cata) {
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
