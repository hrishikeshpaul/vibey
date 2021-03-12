import { GET_AUTH_SUCCESS } from "./authActionTypes";
export interface UserData {
  email: string;
  display_name: string;
  image: string;
  likes: number[];
}
interface DefaultSessionState {
  // session won't be any; will look into the object setup later
  session: any;
  user: UserData;
}

const initialState: DefaultSessionState = {
  session: null,
  user: {
    email: "",
    display_name: "",
    image: "",
    likes: [],
  },
};

export const authReducer = (
  state: DefaultSessionState = initialState,
  action: any
): DefaultSessionState => {
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
