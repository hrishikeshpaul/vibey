import { GET_AUTH_SUCCESS, UserData } from "./userActionTypes";

interface DefaultUserState {
  user: UserData;
}

const initialState: DefaultUserState = {
  user: {
    email: "",
    display_name: "",
    image: "",
    likes: [],
  },
};

export const userReducer = (
  state: DefaultUserState = initialState,
  action: any
): DefaultUserState => {
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
