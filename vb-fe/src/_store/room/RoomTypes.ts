import { Playlist } from "util/Playlist";
import { Room } from "util/Room";

export enum RoomConstants {
  CREATE = "CREATE",
  JOIN = "JOIN",
  ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST",
}

export interface CreateRoom {
  type: typeof RoomConstants.CREATE;
  payload: Room;
}

export interface JoinRoom {
  type: typeof RoomConstants.JOIN;
  payload: string;
}

export interface AddToPlaylist {
  type: typeof RoomConstants.ADD_TO_PLAYLIST;
  payload: Playlist[];
}

export type RoomActionTypes = CreateRoom | JoinRoom | AddToPlaylist;
