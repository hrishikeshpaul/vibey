/**
 * make a room
 * room contains array of users
 *
 *
 */

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("join_room", function (room) {
      try {
        socket.join(room);
        console.log("joined room: ", room);
      } catch (err) {}
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
