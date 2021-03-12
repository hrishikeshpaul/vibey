import { GET_AUTH_SUCCESS, UserState } from "./userActionTypes";

const initialState: UserState = {
  user: {
    email: "",
    display_name: "",
    image: "",
    likes: [],
  },
};

export const userReducer = (
  state: UserState = initialState,
  action: any
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
