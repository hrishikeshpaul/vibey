import { Room } from "util/Room";
import { RoomConstants, RoomActionTypes } from "./RoomTypes";

// import { Error } from "app/models/system.model";

export interface RoomState {
  roomsList: Room[];
}

/**
 * Initial values for the System State
 */
const initialState: RoomState = {
  roomsList: [],
};

export const systemReducer = (state: RoomState = initialState, action: RoomActionTypes): RoomState => {
  switch (action.type) {
    case RoomConstants.CREATE: {
      return {
        ...state,
        roomsList: action.payload,
      };
    }
    default:
      return state;
  }
};
