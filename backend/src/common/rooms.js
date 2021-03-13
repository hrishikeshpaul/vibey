// var socket_io = require("socket.io");
// var io = socket_io();
// var socketApi = {};

// socketApi.io = io;

// io.on("connection", function (socket) {
//   console.log("connected baybeeeee!");
// });

// module.exports = socketApi;

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("we out here");
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
