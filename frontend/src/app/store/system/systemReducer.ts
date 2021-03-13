import { SystemState, SystemActionTypes, GET_API_FAILURE } from "./systemActionTypes";

/**
 * Initial values for the System State
 */
const initialState: SystemState = {
  isLoading: false,
  error: {},
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
    default:
      return state
  }
};
