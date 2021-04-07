import {
  SET_USER,
  UserActionTypes,
} from "./userActionTypes";
import { UserData } from "app/models/user.model";

export interface UserState {
  /**
   * Stores the user data in the state
   */
  user: UserData;
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

export const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
