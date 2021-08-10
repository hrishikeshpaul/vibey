import { PlayerConstants, PlayerActionTypes } from "_store/player/PlayerTypes";

// import { Error } from "app/models/system.model";

export interface PlayerState {
  deviceId: string;
  track: any;
}

/**
 * Initial values for the System State
 */
const initialState: PlayerState = {
  deviceId: "",
  track: {},
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
      };
    }
    default:
      return state;
  }
};
