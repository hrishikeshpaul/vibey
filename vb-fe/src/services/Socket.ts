import socketIOClient, { Socket } from "socket.io-client";
import { push } from "connected-react-router";

import { setHeaders, TokenStorageKeys } from "util/Http";
import { Room } from "util/Room";
import { SOCKET_ENDPOINT, SocketError, SocketEvents } from "util/Socket";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { refreshTokens } from "services/Auth";

class Publisher {
  constructor(private readonly socket: Socket) {} //eslint-disable-line

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, {
      event: eventName,
      data,
      headers: {
        [TokenStorageKeys.AT]: localStorage.getItem(TokenStorageKeys.AT),
      },
    });
  }

  joinRoom(roomId: string): void {
    this.emit(SocketEvents.JoinRoom, { roomId });
  }
}

class Subscriber {
  constructor(private readonly socket: Socket) {} //eslint-disable-line

  joinSuccess(cb: (data: Room) => unknown): void {
    this.socket.on(SocketEvents.JoinSuccess, (data: Room) => cb(data));
  }
}

class VibeySocket {
  socket: any;

  pub: any;

  sub: any;

  init() {
    this.socket = socketIOClient(SOCKET_ENDPOINT);

    return new Promise((resolve, reject) => {
      this.connect(() => {
        resolve("socket connected from class");
        this.pub = new Publisher(this.socket);
        this.sub = new Subscriber(this.socket);
      });

      this.connectError(() => {
        reject(new Error("socket connection error form class"));
      });
    });
  }

  getPublisher() {
    return this.pub as Publisher;
  }

  getSubscriber() {
    return this.sub as Subscriber;
  }

  connect(cb: () => Promise<string> | void) {
    this.socket.on(SocketEvents.Connect, cb);
  }

  connectError(cb: () => Promise<string> | void) {
    this.socket.on(SocketEvents.ConnectError, cb);
  }
}

export const VS = new VibeySocket();

export const emit = {} as any;
export const subscribeTo = {} as any;
// export const socket = socketIOClient(SOCKET_ENDPOINT);

// const emitEvent = (eventName: string, data: any) => {
//   socket.emit(eventName, {
//     event: eventName,
//     data,
//     headers: {
//       [TokenStorageKeys.AT]: localStorage.getItem(TokenStorageKeys.AT),
//     },
//   });
// };

// /**
//  * Listener events and callbacks
//  */
// export const subscribeTo = {
//   connect: (cb: () => Promise<string> | void): void => {
//     socket.on(SocketEvents.Connect, () => cb());
//   },

//   connectError: (cb: () => Promise<string> | void): void => {
//     socket.on(SocketEvents.ConnectError, () => cb());
//   },

//   joinSuccess: (cb: (data: Room) => unknown): void => {
//     socket.on(SocketEvents.JoinSuccess, (data: Room) => cb(data));
//   },

//   message: (cb: (message: string) => unknown): void => {
//     socket.on(SocketEvents.Message, (message: string) => cb(message));
//   },

//   error: (cb: (data: SocketError) => unknown): void => {
//     socket.on(SocketEvents.Error, (data: SocketError) => cb(data));
//   },

//   exception: (cb: (data: SocketError) => unknown): void => {
//     socket.on(SocketEvents.Exception, (data: SocketError) => cb(data));
//   },
// };

// /**
//  * Socket emitters
//  */
// export const emit = {
//   joinRoom: (roomId: string): void => {
//     emitEvent(SocketEvents.JoinRoom, { roomId });
//   },
//   message: (roomId: string, message: string): void => {
//     console.log(roomId);
//     emitEvent(SocketEvents.Message, { message, roomId });
//   },
// };

// export const refreshFromSocket = async (eventName: SocketEvents, data: any): Promise<void> => {
//   try {
//     const res = await refreshTokens();
//     const { accessToken, refreshToken, spotifyAccessToken } = res.data;

//     localStorage.setItem(TokenStorageKeys.AT, accessToken);
//     localStorage.setItem(TokenStorageKeys.RT, refreshToken);
//     localStorage.setItem(TokenStorageKeys.SpotifyAT, spotifyAccessToken);
//     setHeaders();
//     emitEvent(eventName, data);
//   } catch (error: any) {
//     console.error(error);
//     store.dispatch({ type: SystemConstants.LOGIN, payload: false });
//     store.dispatch({ type: SystemConstants.RESET });
//   }
// };

// export const connection = () => {
//   return new Promise((resolve, reject) => {
//     // subscribeTo.connect(() => {
//     //   subscribeTo.error((data: SocketError) => reject(data));
//     //   subscribeTo.exception((data: SocketError) => {
//     //     refreshFromSocket(data.event, data.data);
//     //   });
//     //   resolve("Connection successful");
//     // });
//     // subscribeTo.connectError(() => {
//     //   // TODO: show tooltip here that something went wrong
//     //   console.log("here");
//     //   store.dispatch({ type: SystemConstants.LOGIN, payload: false });
//     //   store.dispatch({ type: SystemConstants.RESET });
//     //   store.dispatch(push("/"));
//     // });
//   });
// };
