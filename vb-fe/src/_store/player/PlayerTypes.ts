import { Track } from "util/Playlist";

export enum PlayerStates {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  INITIAL = "INITIAL",
}

export enum PlayerConstants {
  RESET = "RESET",
  SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_INITIAL = "SET_INITIAL",
  UPDATE_TRACK = "UPDATE_TRACK",
  UPDATE_POSITION = "UPDATE_POSITION",
  CONTROLS_DISABLED = "CONTROLS_DISABLED",
  SET_SHUFFLE = "SET_SHUFFLE",
  SET_DEVICE_ID = "SET_DEVICE_ID",
  SET_VOLUME = "SET_VOLUME",
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

export interface SetInitial {
  type: typeof PlayerConstants.SET_INITIAL;
}

export interface Reset {
  type: typeof PlayerConstants.RESET;
}

export interface SetDeviceId {
  type: typeof PlayerConstants.SET_DEVICE_ID;
  payload: string;
}

export interface SetVolume {
  type: typeof PlayerConstants.SET_VOLUME;
  payload: number;
}

export type PlayerActionTypes =
  | PlayTrack
  | PauseTrack
  | UpdateTrack
  | UpdatePosition
  | SetCurrentPlaylist
  | SetControlsDisabled
  | SetShuffle
  | SetInitial
  | Reset
  | SetDeviceId
  | SetVolume;
