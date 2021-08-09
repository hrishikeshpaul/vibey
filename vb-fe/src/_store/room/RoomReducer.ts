import { dataCreateRoom, Room } from "util/Room";
import { RoomConstants, RoomActionTypes } from "./RoomTypes";

export interface RoomState {
  roomsList: Room[];
  currentRoom: dataCreateRoom | null;
}

/**
 * Initial values for the System State
 */
const initialState: RoomState = {
  roomsList: [],
  currentRoom: null,
};

export const roomReducer = (state: RoomState = initialState, action: RoomActionTypes): RoomState => {
  switch (action.type) {
    case RoomConstants.CREATE: {
      return {
        ...state,
        currentRoom: action.payload,
      };
    }
    default:
      return state;
  }
};
