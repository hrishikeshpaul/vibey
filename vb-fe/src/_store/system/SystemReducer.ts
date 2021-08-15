import { Socket } from "socket.io-client";

import { SystemConstants, SystemActionTypes } from "_store/system/SystemTypes";

export interface SystemState {
  isLoading: boolean;
  /**
   * Stores the error
   * Will need to change this to store the status code and message
   */
  error: any;
  isAuthenticated: boolean;
  /**
   * Denotes if the create room modal is open
   */
  createRoomOpen: boolean;
  /**
   * Tracks expanding of bottom sheet
   */
  bottomSheetExpanded: boolean;
  socket: Socket | null;
  retry: boolean;
}

/**
 * Initial values for the System State
 */
const initialState: SystemState = {
  isLoading: false,
  error: {},
  isAuthenticated: false,
  createRoomOpen: false,
  bottomSheetExpanded: false,
  socket: null,
  retry: false,
};

export const systemReducer = (state: SystemState = initialState, action: SystemActionTypes): SystemState => {
  switch (action.type) {
    case SystemConstants.RESET:
      return { ...initialState };
    case SystemConstants.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SystemConstants.SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SystemConstants.FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case SystemConstants.LOGIN:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SystemConstants.CREATE_ROOM_MODAL:
      return {
        ...state,
        createRoomOpen: action.payload,
      };
    case SystemConstants.EXPAND_BOTTOM_SHEET:
      return {
        ...state,
        bottomSheetExpanded: action.payload,
      };
    case SystemConstants.SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SystemConstants.RETRY:
      return {
        ...state,
        retry: action.payload,
      };
    default:
      return state;
  }
};
