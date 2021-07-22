'use strict';

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('disconnect', () => {
      socket.removeAllListeners();
    });

    socket.on('join', (room) => {
      socket.join(room);
    });

    // TODO trigger POST /rooms/create
    socket.on('create', () => {
    });

    // TODO after Spotify SDK
    socket.on('play', () => { });

    socket.on('pause', () => { });

    socket.on('seek', () => { });

    socket.on('change', () => { });

    socket.on('log', () => { });

    socket.on('announcement', () => { });

    socket.on('close', () => { });
  });
};
