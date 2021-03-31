const { app } = require('../lib/app');
const { validateTagName, validateTagLength } = require("../middlewares/tags");
const { isLoggedIn } = require("../middlewares/auth");

const { Tag } = require("../db/mongo/models/tag");

/**
 * Get a particular tag
 * If tag doesn't exist, create and return tag
 * If tag exists, add to score and return updated tag
 */
app.get(
  "/",
  isLoggedIn,
  validateTagName,
  validateTagLength,
  async function (req, res) {
    const { name } = req.query;

    try {
      let foundTag = await Tag.findOne({ name });

      if (!foundTag) {
        foundTag = await new Tag({ name: name, score: 1 }).save();
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
      console.log("err: ", err);
      res.status(500).json(err);
    }
  }
);

/**
 * Search for all tags for a specified query
 * If error finding in DB, return (500) Error finding results
 * If success, return (200) with results [{ name, score }, ... ], ordered by score descending
 * limit 5 results
 * The second error handle may be unnecessary
 *
 */
app.get("/search", async (req, res) => {
  const { str } = req.query;
  try {
    Tag.find(
      { name: { $regex: str, $options: "i" } },
      { name: 1, score: 1, _id: 0 },
      function (err, docs) {
        if (err) {
          res.status(500).json({ error: "Error finding results" });
        } else {
          res.status(200).json(docs);
        }
      }
    )
      .sort({ score: -1 })
      .limit(5);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
