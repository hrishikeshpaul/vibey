import { Room } from "util/Room";

export enum RoomConstants {
  CREATE = "CREATE",
}

export interface CreateRoom {
  type: typeof RoomConstants.CREATE;
  payload: Room[];
}

export type RoomActionTypes = CreateRoom;
