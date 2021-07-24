import {
  SystemActionTypes,
  GET_API_FAILURE,
  SET_USER_LOGIN,
  GET_API_START,
  GET_API_SUCCESS,
  SET_CREATE_ROOM_MODAL,
} from "app/store/system/systemActionTypes";
import { Error } from "app/models/system.model";

export interface SystemState {
  /**
   * Denotes if the system is in loading state
   */
  isLoading: boolean;
  /**
   * Stores the error
   * Will need to change this to store the status code and message
   */
  error: Error;
  /**
   * Denotes if the user is logged in
   */
  isLoggedIn: boolean;
  /**
   * Denotes if the create room modal is open
   */
  createOpen: boolean;
}

/**
 * Initial values for the System State
 */
const initialState: SystemState = {
  isLoading: false,
  error: {},
  isLoggedIn: false,
  createOpen: false,
};

export const systemReducer = (state: SystemState = initialState, action: SystemActionTypes): SystemState => {
  switch (action.type) {
    case GET_API_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_API_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_CREATE_ROOM_MODAL:
      return {
        ...state,
        createOpen: action.payload,
      };
    default:
      return state;
  }
};
