import { SystemConstants, SystemActionTypes, RoomModalType, RETRY_TYPES } from "_store/system/SystemTypes";
// import { Error } from "app/models/system.model";

export interface SystemState {
  isLoading: boolean;
  loadingText: string;
  /**
   * Stores the error
   * Will need to change this to store the status code and message
   */
  error: any;
  isAuthenticated: boolean;
  /**
   * Denotes if the room modal is open
   */
  roomModal: RoomModalType;
  /**
   * Tracks expanding of bottom sheet
   */
  bottomSheetExpanded: boolean;
  retry: RETRY_TYPES;
  isSystemInit: boolean;
  socketsConnected: boolean;
  httpConnected: boolean;
}

/**
 * Initial values for the System State
 */
const initialState: SystemState = {
  isLoading: false,
  error: {},
  isAuthenticated: false,
  roomModal: {
    isOpen: false,
    type: null,
  },
  bottomSheetExpanded: false,
  retry: RETRY_TYPES.NONE,
  loadingText: "Loading...",
  isSystemInit: false,
  socketsConnected: false,
  httpConnected: false,
};

export const systemReducer = (state: SystemState = initialState, action: SystemActionTypes): SystemState => {
  switch (action.type) {
    case SystemConstants.RESET:
      return { ...initialState };
    case SystemConstants.INITIALIZED:
      return {
        ...state,
        isSystemInit: action.payload,
      };
    case SystemConstants.SOCKETS_CONNECTED: {
      return {
        ...state,
        socketsConnected: action.payload,
      };
    }
    case SystemConstants.LOADING:
      return {
        ...state,
        isLoading: true,
        loadingText: action.payload ? action.payload : "Loading...",
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
    case SystemConstants.SET_ROOM_MODAL:
      return {
        ...state,
        roomModal: action.payload,
      };
    case SystemConstants.EXPAND_BOTTOM_SHEET:
      return {
        ...state,
        bottomSheetExpanded: action.payload,
      };
    case SystemConstants.RETRY:
      return {
        ...state,
        retry: action.payload,
      };
    case SystemConstants.HTTP_CONNECTED:
      return {
        ...state,
        httpConnected: action.payload,
      };
    default:
      return state;
  }
};
