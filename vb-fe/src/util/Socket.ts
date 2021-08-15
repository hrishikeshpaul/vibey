import { BASE_URL } from "./Endpoints";

export const SOCKET_ENDPOINT = `${BASE_URL}`;
export const HEROKU_SOCKET_ENDPOINT = "https://vibey-be--qa.herokuapp.com/";

export enum SocketEvents {
  Connect = "connect",
  JoinRoom = "join-room",
  JoinSuccess = "join-room-success",
  Message = "message",
  Exception = "exception",
}

export interface SocketError {
  status: string;
  message: string;
}

export interface SocketMessage {
  message: string;
  roomId: string;
}
