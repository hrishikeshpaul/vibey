import mongoose from "mongoose";

module.exports = function connectMongoDB() {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log("MongoDB connected")
    );
    /**
     *  make Mongoose use findOneAndUpdate(); resolves deprecation warning
     *  see findAndModify(): https://mongoosejs.com/docs/deprecations.html
     */
    mongoose.set("useFindAndModify", false);
  } catch (e) {
    console.log("MongoDB count not connect :(");
  }
};
