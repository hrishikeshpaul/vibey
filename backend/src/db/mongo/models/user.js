const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }]
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
