import socketIOClient from "socket.io-client";

import { TokenStorageKeys } from "util/Http";
import { Room } from "util/Room";
import { SOCKET_ENDPOINT, SocketError, SocketMessage, SocketEvents } from "util/Socket";

export const socket = socketIOClient(SOCKET_ENDPOINT, {
  transportOptions: {
    polling: {
      extraHeaders: {
        [TokenStorageKeys.AT]: localStorage.getItem(TokenStorageKeys.AT),
      },
    },
  },
});

const emitEvent = (eventName: string, data: any) => {
  socket.emit(eventName, { event: eventName, data });
};

export const subscribeTo = {
  connect: (cb: () => Promise<string> | void): void => {
    socket.on(SocketEvents.Connect, () => cb());
  },

  joinSuccess: (cb: (data: Room) => unknown): void => {
    socket.on(SocketEvents.JoinSuccess, (data: Room) => cb(data));
  },

  message: (cb: (message: string) => unknown): void => {
    socket.on(SocketEvents.Message, (message: string) => cb(message));
  },

  exception: (cb: (data: SocketError) => unknown): void => {
    socket.on(SocketEvents.Exception, (data: SocketError) => cb(data));
  },
};

export const emit = {
  joinRoom: (roomId: string): void => {
    emitEvent(SocketEvents.JoinRoom, roomId);
  },
  message: ({ message, roomId }: SocketMessage): void => {
    socket.emit(SocketEvents.Message, { message, roomId });
  },
};

export const connection = () => {
  return new Promise((resolve, reject) => {
    subscribeTo.connect(() => resolve("Connection successful"));
    subscribeTo.exception((data: SocketError) => reject(data));
  });
};

// const handleException = () => {};
