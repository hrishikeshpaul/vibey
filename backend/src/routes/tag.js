import { validateTagName, validateTagLength } from "../middlewares/tags";
import { isLoggedIn } from "../middlewares/auth";
var express = require("express");
var router = express.Router();

router.get(
  "/",
  isLoggedIn,
  validateTagName,
  validateTagLength,
  function (req, res, next) {
    const { name } = req.query.name;
    res.status(201).json("hello");
  }
);

module.exports = router;
