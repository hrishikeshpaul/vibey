import { Track } from "util/Playlist";
import { PlayerConstants, PlayerActionTypes } from "_store/player/PlayerTypes";

// import { Error } from "app/models/system.model";

export interface PlayerState {
  track: Track | null;
  paused: boolean;
  trackPosition: number;
  playlistContext: string;
  shuffle: boolean;
  deviceId: string;
}

/**
 * Initial values for the System State
 */
const initialState: PlayerState = {
  track: null,
  paused: true,
  trackPosition: 0,
  playlistContext: "",
  shuffle: false,
  deviceId: "",
};

export const playerReducer = (state: PlayerState = initialState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
    case PlayerConstants.RESET: {
      return { ...initialState };
    }
    case PlayerConstants.SET_CURRENT_PLAYLIST: {
      return {
        ...state,
        playlistContext: action.payload,
      };
    }
    case PlayerConstants.UPDATE_TRACK: {
      return {
        ...state,
        track: action.payload,
      };
    }
    case PlayerConstants.SET_DEVICE_ID: {
      return {
        ...state,
        deviceId: action.payload,
      };
    }
    case PlayerConstants.PLAY: {
      return {
        ...state,
        paused: false,
      };
    }
    case PlayerConstants.PAUSE: {
      return {
        ...state,
        paused: true,
      };
    }
    case PlayerConstants.UPDATE_POSITION: {
      return {
        ...state,
        trackPosition: action.payload,
      };
    }
    case PlayerConstants.SET_SHUFFLE: {
      return {
        ...state,
        shuffle: action.payload,
      };
    }
    default:
      return state;
  }
};
