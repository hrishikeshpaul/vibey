import {
  GET_AUTH_SUCCESS,
  UserState,
  UserActionTypes,
} from "./userActionTypes";

/**
 * Initial values of the user state
 */
const initialState: UserState = {
  user: {
    id: "",
    username: "",
    href: "",
    uri: "",
    email: "",
    display_name: "",
    image: "",
    likes: [],
  },
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
