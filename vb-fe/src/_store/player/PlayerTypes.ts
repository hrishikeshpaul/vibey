import { Track } from "util/Playlist";

export enum PlayerStates {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  INITIAL = "INITIAL",
}

export enum PlayerConstants {
  ADD_DEVICE = "ADD_DEVICE",
  ADD_PLAYER = "ADD_PLAYER",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  UPDATE_TRACK = "UPDATE_TRACK",
  UPDATE_POSITION = "UPDATE_POSITION",
  UPDATE_DURATION = "UPDATE_DURATION",
}

export interface AddPlayer {
  type: typeof PlayerConstants.ADD_PLAYER;
  payload: any;
}

export interface AddDevice {
  type: typeof PlayerConstants.ADD_DEVICE;
  payload: string;
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

export type PlayerActionTypes =
  | AddPlayer
  | AddDevice
  | PlayTrack
  | PauseTrack
  | UpdateTrack
  | UpdatePosition
  | UpdateDuration;
