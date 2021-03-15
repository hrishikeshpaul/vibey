import { validateTagName, validateTagLength } from "../middlewares/tags";
import { isLoggedIn } from "../middlewares/auth";

var Tag = require("../db/mongo/models/tag");
var express = require("express");
var router = express.Router();

/**
 * Get a particular tag
 * If tag doesn't exist, create and return tag
 * If tag exists, add to score and return updated tag
 */
router.get(
  "/",
  isLoggedIn,
  validateTagName,
  validateTagLength,
  async function (req, res) {
    const { name } = req.query;

    try {
      let foundTag = await Tag.findOne({ name });

      if (!foundTag) {
        foundTag = await new Tag({ name, score: 0 }).save();
        res.status(201).json({ name: foundTag.name });
      } else {
        foundTag = await Tag.findOneAndUpdate(
          { name },
          { $set: { score: foundTag.score + 1 } },
          { new: true }
        );
        res.status(200).json({ name: foundTag.name });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
