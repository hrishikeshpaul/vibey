import { BASE_URL } from "util/Endpoints";

export const SOCKET_ENDPOINT = `${BASE_URL}`;
export const HEROKU_SOCKET_ENDPOINT = "https://vibey-be--qa.herokuapp.com/";

export enum SocketEvents {
  JoinRoom = "join-room",
  JoinSuccess = "join-room-success",
  Message = "message",
  Error = "socket-err",
}

export interface SocketError {
  code: number;
  message: string;
}

export interface SocketMessage {
  message: string;
  roomId: string;
}
