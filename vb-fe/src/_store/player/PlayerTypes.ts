import { Track } from "util/Playlist";

export enum PlayerConstants {
  ADD_DEVICE = "ADD_DEVICE",
  ADD_PLAYER = "ADD_PLAYER",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  UPDATE_TRACK = "UPDATE_TRACK",
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
  payload: Track;
}

export interface PauseTrack {
  type: typeof PlayerConstants.PAUSE;
}

export interface UpdateTrack {
  type: typeof PlayerConstants.UPDATE_TRACK;
}

export type PlayerActionTypes = AddPlayer | AddDevice | PlayTrack | PauseTrack | UpdateTrack;
