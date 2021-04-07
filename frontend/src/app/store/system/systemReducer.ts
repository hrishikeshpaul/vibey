import { SystemState, SystemActionTypes, GET_API_FAILURE, SET_USER_LOGIN } from "./systemActionTypes";

/**
 * Initial values for the System State
 */
const initialState: SystemState = {
  isLoading: false,
  error: {},
  isLoggedIn: false
};

export const systemReducer = (
  state: SystemState = initialState,
  action: SystemActionTypes
): SystemState => {
  switch (action.type) {
    case GET_API_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case SET_USER_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload
      }
    default:
      return state
  }
};
