import { SystemState, SystemActionTypes } from "./systemActionTypes";

const initialState: SystemState = {
  isLoading: false,
  error: "",
};

export const systemReducer = (
  state: SystemState = initialState,
  action: SystemActionTypes
): SystemState => {
  switch (action.type) {
    default:
      return state;
  }
};
