import { Track } from "util/Playlist";
import { PlayerConstants, PlayerActionTypes, PlayerStates } from "_store/player/PlayerTypes";

// import { Error } from "app/models/system.model";

export interface PlayerState {
  deviceId: string;
  track: Track | null;
  state: PlayerStates;
  trackDuration: number;
  trackPosition: number;
  volume: number;
  playlistContext: string;
  trackNumber: number;
}

/**
 * Initial values for the System State
 */
const initialState: PlayerState = {
  deviceId: "",
  track: null,
  state: PlayerStates.INITIAL,
  trackDuration: 0,
  trackPosition: 0,
  volume: 0,
  playlistContext: "",
  trackNumber: 0,
};

export const playerReducer = (state: PlayerState = initialState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
    case PlayerConstants.SET_CURRENT_PLAYLIST: {
      return {
        ...state,
        playlistContext: action.payload,
      };
    }
    case PlayerConstants.SET_TRACK_NUMBER: {
      return {
        ...state,
        trackNumber: action.payload,
      };
    }
    case PlayerConstants.UPDATE_TRACK: {
      return {
        ...state,
        track: action.payload,
      };
    }
    case PlayerConstants.PLAY: {
      return {
        ...state,
        state: PlayerStates.PLAYING,
      };
    }
    case PlayerConstants.PAUSE: {
      return {
        ...state,
        state: PlayerStates.PAUSED,
      };
    }
    case PlayerConstants.UPDATE_POSITION: {
      return {
        ...state,
        trackPosition: action.payload,
      };
    }
    case PlayerConstants.UPDATE_DURATION: {
      return {
        ...state,
        trackDuration: action.payload,
      };
    }
    default:
      return state;
  }
};
