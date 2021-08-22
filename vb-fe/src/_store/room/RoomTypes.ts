import { Playlist } from "util/Playlist";
import { Room } from "util/Room";

export enum RoomConstants {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  JOIN = "JOIN",
  ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST",
  PLAYLIST_LOADING = "PLAYLIST_LOADING",
}

export interface CreateRoom {
  type: typeof RoomConstants.CREATE;
  payload: Room;
}

export interface UpdateRoom {
  type: typeof RoomConstants.UPDATE;
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

export type RoomActionTypes = CreateRoom | UpdateRoom | JoinRoom | AddToPlaylist | PlaylistLoading;
