import { Track } from "util/Playlist";
import { PlayerConstants, PlayerActionTypes, PlayerStates } from "_store/player/PlayerTypes";

// import { Error } from "app/models/system.model";

export interface PlayerState {
  deviceId: string;
  track: Track | null;
  state: PlayerStates;
}

/**
 * Initial values for the System State
 */
const initialState: PlayerState = {
  deviceId: "",
  track: null,
  state: PlayerStates.INITIAL,
};

export const playerReducer = (state: PlayerState = initialState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
    case PlayerConstants.ADD_DEVICE: {
      return {
        ...state,
        deviceId: action.payload,
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
    default:
      return state;
  }
};
