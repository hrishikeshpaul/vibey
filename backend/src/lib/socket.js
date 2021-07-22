'use strict';

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('disconnect', () => {
      console.log('disconnected');
      socket.removeAllListeners();
    });

    socket.on('join', (room) => {
      console.log('join room: ', room);
    });

    socket.on('create', (room) => { });

    socket.on('play', () => { });

    socket.on('pause', () => { });

    socket.on('seek', () => { });

    socket.on('change', () => { });

    socket.on('log', () => { });

    socket.on('announcement', () => { });

    socket.on('close', () => { });
  });
};
