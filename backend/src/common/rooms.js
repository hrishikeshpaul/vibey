const io = require("../../bin/www");

/*
 * Very far-back import with path, since bin is behind src
 * from my understanding, if we want to keep the server in www then we have
 * to pull something back from www to make the sockets work here,
 * whether it's io or server
 *
 */

io.on("connection", (socket) => {
  console.log("new connection found!!!");

  socket.on("disconnect", () => {
    console.log("the connection disconnected!!");
  });
});
