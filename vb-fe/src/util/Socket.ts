import { BASE_URL } from "util/Endpoints";

export const SOCKET_ENDPOINT = `${BASE_URL}`;
export const HEROKU_SOCKET_ENDPOINT = "https://vibey-be--qa.herokuapp.com/";

export enum SocketEvents {
  Health = "health",
  HealthSuccess = "health-success",
  Connect = "connect",
  ConnectError = "connect_error",
  JoinRoom = "join-room",
  JoinSuccess = "join-room-success",
  Message = "message",
  Error = "socket-err",
  Exception = "exception",
  PauseTrack = "pause-track",
  OnPlayTrack = "on-play-track",
  EmitPlayTrack = "emit-play-track",
}

export interface SocketError {
  code: number;
  message: string;
  data: any;
  event: SocketEvents;
}

export interface SocketMessage {
  message: string;
  roomId: string;
}
