import socketIOClient, { Socket } from "socket.io-client";
import { push } from "connected-react-router";

import { HttpStatus, setHeaders, TokenStorageKeys } from "util/Http";
import { Room } from "util/Room";
import { SOCKET_ENDPOINT, SocketError, SocketEvents } from "util/Socket";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { refreshTokens } from "services/Auth";

/**
 * Class for all the publishers that emit events
 */
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

  healthCheck(): void {
    this.emit(SocketEvents.Health, "");
  }
}

/**
 * Class for all the subscribers that listen to events
 */
class Subscriber {
  constructor(private readonly socket: Socket) {} //eslint-disable-line

  joinSuccess(cb: (data: Room) => unknown): void {
    this.socket.on(SocketEvents.JoinSuccess, (data: Room) => cb(data));
  }

  healthCheck(cb: (status: HttpStatus) => void): void {
    this.socket.on(SocketEvents.HealthSuccess, (status: HttpStatus) => cb(status));
  }
}

class VibeySocket {
  socket: any;

  /** Instance of the publisher */
  pub: any;

  /** Instance of the subscriber */
  sub: any;

  init() {
    this.socket = socketIOClient(SOCKET_ENDPOINT);

    return new Promise((resolve, reject) => {
      this.connect(() => {
        this.pub = new Publisher(this.socket) as Publisher;
        this.sub = new Subscriber(this.socket) as Subscriber;

        /**
         * After connection a health check signal is emitted to check if the provided tokens
         * are valid
         */
        this.pub.healthCheck();
        this.sub.healthCheck((status: HttpStatus) => {
          if (status === HttpStatus.OK) {
            resolve("Sockets connected!");
          }
        });

        this.exception((data: SocketError) => {
          this.refreshFromSocket(data.event, data.data);
        });
      });

      this.connectError(() => {
        reject(new Error("socket connection error form class"));
        // TODO: show tooltip here that something went wrong
        store.dispatch({ type: SystemConstants.LOGIN, payload: false });
        store.dispatch({ type: SystemConstants.RESET });
        store.dispatch(push("/"));
      });
    });
  }

  getPublisher() {
    return this.pub as Publisher;
  }

  getSubscriber() {
    return this.sub as Subscriber;
  }

  disconnect() {
    this.socket.disconnect();
  }

  connect(cb: () => Promise<string> | void) {
    this.socket.on(SocketEvents.Connect, cb);
  }

  connectError(cb: () => Promise<string> | void) {
    this.socket.on(SocketEvents.ConnectError, cb);
  }

  exception(cb: (data: SocketError) => unknown) {
    this.socket.on(SocketEvents.Exception, (data: SocketError) => cb(data));
  }

  async refreshFromSocket(eventName: SocketEvents, data: any): Promise<void> {
    try {
      const res = await refreshTokens();
      const { accessToken, refreshToken, spotifyAccessToken } = res.data;

      localStorage.setItem(TokenStorageKeys.AT, accessToken);
      localStorage.setItem(TokenStorageKeys.RT, refreshToken);
      localStorage.setItem(TokenStorageKeys.SpotifyAT, spotifyAccessToken);
      setHeaders();
      this.sub.emitEvent(eventName, data);
    } catch (error: any) {
      store.dispatch({ type: SystemConstants.LOGIN, payload: false });
      store.dispatch({ type: SystemConstants.RESET });
    }
  }
}

export const VS = new VibeySocket();
