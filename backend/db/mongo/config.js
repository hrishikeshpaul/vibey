const mongoose = require("mongoose");

module.exports = function connectMongoDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: "true",
  })
  try {
     mongoose.connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("MongoDB is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
}