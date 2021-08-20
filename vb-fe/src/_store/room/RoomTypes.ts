import { Playlist } from "util/Playlist";
import { Room } from "util/Room";

export enum RoomConstants {
  RESET = "RESET",
  CREATE = "CREATE",
  JOIN = "JOIN",
  SET_ROOM = "SET_ROOM",
  SET_HOST = "SET_HOST",
  ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST",
  PLAYLIST_LOADING = "PLAYLIST_LOADING",
  ADD_ROOMS = "ADD_ROOMS",
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

export interface PlaylistLoading {
  type: typeof RoomConstants.PLAYLIST_LOADING;
  payload: boolean;
}

export interface SetRoom {
  type: typeof RoomConstants.SET_ROOM;
  payload: Room;
}

export interface SetHost {
  type: typeof RoomConstants.SET_HOST;
  payload: boolean;
}

export interface Reset {
  type: typeof RoomConstants.RESET;
}

export interface AddRooms {
  type: typeof RoomConstants.ADD_ROOMS;
  payload: Room[];
}
export type RoomActionTypes =
  | CreateRoom
  | JoinRoom
  | AddToPlaylist
  | PlaylistLoading
  | SetRoom
  | SetHost
  | Reset
  | AddRooms;
