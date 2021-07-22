'use strict';

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('disconnect', () => {
      socket.removeAllListeners();
    });

    socket.on('join', (room) => {
      socket.join(room);
    });

    // TODO create room endpoint should trigger this
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
