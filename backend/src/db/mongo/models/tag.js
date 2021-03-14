import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * CONSIDERATION:
 * minlength and maxlength for tag chars
 * minlength and maxlength could be validated here at schema level
 * this would make error handling more complicated
 * moving validation into the relevant API call
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
     *     https://docs.mongodb.com/manual/core/index-case-insensitive/
     */
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("tag", TagSchema);
