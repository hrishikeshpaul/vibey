import { SystemActionTypes } from "app/store/system/systemActionTypes";
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";

export interface UserState {
  user: UserData;
}

/*
 * UserData is interface for auth .get() call
 * I assume this will be tweaked to include name and session information
 *
 */
export interface UserData {
  id: string;
  username: string;
  href: string;
  uri: string;
  email: string;
  display_name: string;
  image: string;
  likes: string[];
}

export interface GetAuthSuccess {
  type: typeof GET_AUTH_SUCCESS;
  payload: UserData;
}

export type UserActionTypes = GetAuthSuccess | SystemActionTypes;
