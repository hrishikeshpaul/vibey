'use strict';

const mongoose = require('mongoose');

module.exports = function connectMongoDB() {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err));

    /**
     *  make Mongoose use findOneAndUpdate(); resolves deprecation warning
     *  see findAndModify(): https://mongoosejs.com/docs/deprecations.html
    */
    mongoose.set('useFindAndModify', false);
    /**
     * Resolves:
     * (node:31152) DeprecationWarning: collection.ensureIndex
     * is deprecated. Use createIndexes instead.
     */
    mongoose.set('useCreateIndex', true);
  } catch (e) {
    console.log(e);
    console.log('MongoDB count not connect :(');
  }
};
