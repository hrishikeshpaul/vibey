export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";

export interface UserState {
  user: UserData;
}

/*
 * AuthData is interface for auth .get() call
 * I assume this will be tweaked to include name and session information
 *
 */
export interface UserData {
  email: string;
  display_name: string;
  image: string;
  likes: number[];
}
export interface GetAuthSuccess {
  type: typeof GET_AUTH_SUCCESS;
  payload: UserData;
}

export type UserDispatchTypes = GetAuthSuccess;
