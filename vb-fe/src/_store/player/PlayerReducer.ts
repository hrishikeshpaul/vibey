import { Track } from "util/Playlist";
import { PlayerConstants, PlayerActionTypes, PlayerStates } from "_store/player/PlayerTypes";

// import { Error } from "app/models/system.model";

export interface PlayerState {
  track: Track | null;
  state: PlayerStates;
  trackPosition: number;
  playlistContext: string;
  shuffle: boolean;
}

/**
 * Initial values for the System State
 */
const initialState: PlayerState = {
  track: null,
  state: PlayerStates.INITIAL,
  trackPosition: 0,
  playlistContext: "",
  shuffle: false,
};

export const playerReducer = (state: PlayerState = initialState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
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
