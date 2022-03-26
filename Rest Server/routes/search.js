const { Router } = require("express");
const { check } = require("express-validator");
const { search } = require("../controllers/search");
const { Category } = require("../models");

const router = Router();

router.get(
  "/:collection/:search",
  [
    check("collection", "The collection is required").not().isEmpty(),
    check("search", "the word is required to search").notEmpty(),
  ],
  search
);

module.exports = router;
