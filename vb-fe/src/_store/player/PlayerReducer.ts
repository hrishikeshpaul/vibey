import { Track } from "util/Playlist";
import { PlayerConstants, PlayerActionTypes } from "_store/player/PlayerTypes";

// import { Error } from "app/models/system.model";

export interface PlayerState {
  deviceId: string;
  track: Track | null;
  state: "PLAYING" | "PAUSED" | "NONE";
}

/**
 * Initial values for the System State
 */
const initialState: PlayerState = {
  deviceId: "",
  track: null,
  state: "NONE",
};

export const playerReducer = (state: PlayerState = initialState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
    case PlayerConstants.ADD_DEVICE: {
      return {
        ...state,
        deviceId: action.payload,
      };
    }
    case PlayerConstants.PLAY: {
      return {
        ...state,
        track: action.payload,
        state: "PLAYING",
      };
    }
    case PlayerConstants.PAUSE: {
      return {
        ...state,
        state: "PAUSED",
      };
    }
    default:
      return state;
  }
};
