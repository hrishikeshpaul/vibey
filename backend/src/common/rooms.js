/**
 * make a room
 * room contains array of users
 *
 *
 */

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log(`disconnected: ${socket.id}`);
    });

    socket.on("join", (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);
    });

    socket.on("chat", (data) => {
      const { message, room } = data;
      console.log(`msg: ${message}, room: ${room}`);
      io.to(room).emit("chat", message);
    });

    /**
     * Join
     * socket.join("some room");
     */

    /**
     * Leave
     * socket.leave("some room");
     */

    /**
     * Broadcast to other members (except sender)
     * io.to("some room").emit("some event");
     */

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
