'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  href: {
    type: String,
  },
  uri: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
});

const User = mongoose.model('user', UserSchema);
module.exports = {
  User,
};
