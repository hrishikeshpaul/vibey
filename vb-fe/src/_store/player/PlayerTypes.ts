export enum PlayerConstants {
  ADD_DEVICE = "ADD_DEVICE",
  ADD_PLAYER = "ADD_PLAYER",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
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
  payload: string;
}

export type PlayerActionTypes = AddPlayer | AddDevice | PlayTrack;
