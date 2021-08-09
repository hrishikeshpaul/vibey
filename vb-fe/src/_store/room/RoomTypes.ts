import { Room } from "util/Room";

export enum RoomConstants {
  CREATE = "CREATE",
  JOIN = "JOIN",
}

export interface CreateRoom {
  type: typeof RoomConstants.CREATE;
  payload: Room;
}

export interface JoinRoom {
  type: typeof RoomConstants.JOIN;
  payload: string;
}

export type RoomActionTypes = CreateRoom | JoinRoom;
