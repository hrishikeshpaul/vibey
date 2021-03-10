const mongoose = require("mongoose");

module.exports = function connectMongoDB() {
  try {
     mongoose.connect(
      process.env.MONGO_URI,
      {useUnifiedTopology: true, useNewUrlParser: true},
      () => console.log("MongoDB connected")
    );

  } catch (e) {
    console.log("MongoDB count not connect :(");
  }
}