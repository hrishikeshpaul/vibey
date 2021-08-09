import { dataCreateRoom } from "util/Room";

export enum RoomConstants {
  CREATE = "CREATE",
}

export interface CreateRoom {
  type: typeof RoomConstants.CREATE;
  payload: dataCreateRoom;
}

export type RoomActionTypes = CreateRoom;
