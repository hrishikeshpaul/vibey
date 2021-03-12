interface UserData {
  email: string;
  username: string;
  firstName: string;
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
    username: "",
    firstName: "",
    likes: [],
  },
};

export const sessionReducer = (
  state: DefaultSessionState = initialState,
  action: any
): DefaultSessionState => {
  switch (action.type) {
    default:
      return state;
  }
};
