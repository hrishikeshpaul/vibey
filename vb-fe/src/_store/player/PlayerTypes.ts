import { Track } from "util/Playlist";

export enum PlayerStates {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  INITIAL = "INITIAL",
}

export enum PlayerConstants {
  SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST",
  SET_TRACK_NUMBER = "SET_TRACK_NUMBER",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  UPDATE_TRACK = "UPDATE_TRACK",
  UPDATE_POSITION = "UPDATE_POSITION",
  UPDATE_DURATION = "UPDATE_DURATION",
  SET_VOLUME = "SET_VOLUME",
}

export interface SetTrackNumber {
  type: typeof PlayerConstants.SET_TRACK_NUMBER;
  payload: number;
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

export interface UpdateDuration {
  type: typeof PlayerConstants.UPDATE_DURATION;
  payload: number;
}

export interface SetCurrentPlaylist {
  type: typeof PlayerConstants.SET_CURRENT_PLAYLIST;
  payload: string;
}

export interface SetVolume {
  type: typeof PlayerConstants.SET_VOLUME;
  payload: number;
}

export type PlayerActionTypes =
  | SetTrackNumber
  | PlayTrack
  | PauseTrack
  | UpdateTrack
  | UpdatePosition
  | UpdateDuration
  | SetCurrentPlaylist
  | SetVolume;
