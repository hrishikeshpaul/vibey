const mongoose = require("mongoose")

/**
 * CONSIDERATION:
 * minLength and maxLength validated in middleware
 * should consider special characters filtering and cuss words
 *
 */

const TagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    /**
     * Testing for case-insensitive uniqueness
     * collation: treat different characters as the same character
     *    locale: establishes that ENGLISH characters are considered to be the same
     *    strength: 2 (1 and 2 indicate case-insensitive)
     *    https://docs.mongodb.com/manual/core/index-case-insensitive/
     */
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  score: {
    type: Number,
    required: true,
  },
});

const Tag = mongoose.model("tag", TagSchema);;

module.exports = {
  Tag
}
