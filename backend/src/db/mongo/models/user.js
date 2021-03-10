const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = mongoose.Schema({
  display_name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  href: {
    type: String
  },
  uri: {
    type: String
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});

// export model user with UserSche
module.exports = mongoose.model("user", UserSchema);
