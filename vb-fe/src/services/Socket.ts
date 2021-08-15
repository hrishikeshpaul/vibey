import socketIOClient from "socket.io-client";
import { push, CallHistoryMethodAction } from "connected-react-router";

import { refreshTokens } from "services/Auth";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { setHeaders, TokenStorageKeys } from "util/Http";
import { Room } from "util/Room";
import { SOCKET_ENDPOINT, SocketException, SocketMessage, SocketEvents } from "util/Socket";

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

  exception: (cb: (data: SocketException) => unknown): void => {
    socket.on(SocketEvents.Exception, (data: SocketException) => cb(data));
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
    subscribeTo.exception((data: SocketException) => reject(data));
  });
};

export const refreshFromSocket = async (eventName: SocketEvents, data: unknown): Promise<void> => {
  try {
    const res = await refreshTokens();
    const { accessToken, refreshToken, spotifyAccessToken } = res.data;

    localStorage.setItem(TokenStorageKeys.AT, accessToken);
    localStorage.setItem(TokenStorageKeys.RT, refreshToken);
    localStorage.setItem(TokenStorageKeys.SpotifyAT, spotifyAccessToken);
    setHeaders();
    console.log(eventName, data); // TODO currently getting two calls, second one is undefined.
    socket.emit(eventName, data);
  } catch (error: any) {
    console.error(error);
    store.dispatch({ type: SystemConstants.FAILURE, payload: false });
    store.dispatch(push("/"));
  }
};
