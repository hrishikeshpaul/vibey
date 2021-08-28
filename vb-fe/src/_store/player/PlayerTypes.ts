import { Track } from "util/Playlist";

export enum PlayerConstants {
  RESET = "RESET",
  SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  UPDATE_TRACK = "UPDATE_TRACK",
  UPDATE_POSITION = "UPDATE_POSITION",
  CONTROLS_DISABLED = "CONTROLS_DISABLED",
  SET_SHUFFLE = "SET_SHUFFLE",
  SET_DEVICE_ID = "SET_DEVICE_ID",
  SET_CONTEXT_URI = "SET_CONTEXT_URI",
}

export interface PlayTrack {
  type: typeof PlayerConstants.PLAY;
}

export interface PauseTrack {
  type: typeof PlayerConstants.PAUSE;
}

export interface UpdateTrack {
  type: typeof PlayerConstants.UPDATE_TRACK;
  payload: Track;
}

export interface UpdatePosition {
  type: typeof PlayerConstants.UPDATE_POSITION;
  payload: number;
}

export interface SetCurrentPlaylist {
  type: typeof PlayerConstants.SET_CURRENT_PLAYLIST;
  payload: string;
}

export interface SetControlsDisabled {
  type: typeof PlayerConstants.CONTROLS_DISABLED;
  payload: boolean;
}

export interface SetShuffle {
  type: typeof PlayerConstants.SET_SHUFFLE;
  payload: boolean;
}

export interface Reset {
  type: typeof PlayerConstants.RESET;
}

export interface SetDeviceId {
  type: typeof PlayerConstants.SET_DEVICE_ID;
  payload: string;
}

export interface SetContextUri {
  type: typeof PlayerConstants.SET_CONTEXT_URI;
  payload: string;
}

export type PlayerActionTypes =
  | PlayTrack
  | PauseTrack
  | UpdateTrack
  | UpdatePosition
  | SetCurrentPlaylist
  | SetControlsDisabled
  | SetShuffle
  | Reset
  | SetDeviceId
  | SetContextUri;
