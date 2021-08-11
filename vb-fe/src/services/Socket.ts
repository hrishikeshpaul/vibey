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

/**
 * Listener events and callbacks
 */
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

  error: (cb: (data: SocketError) => unknown): void => {
    socket.on(SocketEvents.Error, (data: SocketError) => cb(data));
  },
};

/**
 * Socket emitters
 */
export const emit = {
  joinRoom: (roomId: string): void => {
    socket.emit(SocketEvents.JoinRoom, roomId);
  },
  message: ({ message, roomId }: SocketMessage): void => {
    socket.emit(SocketEvents.Message, { message, roomId });
  },
};

export const connection = () => {
  return new Promise((resolve, reject) => {
    subscribeTo.connect(() => resolve("Connection successful"));
    subscribeTo.error((data: SocketError) => reject(data));
  });
};
