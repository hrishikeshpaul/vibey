import { UserConstants, UserActionTypes } from "_store/user/UserTypes";

export interface UserState {
  /**
   * Stores the user data in the state
   */
  user: any;
}

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

export const userReducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case UserConstants.SET:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
