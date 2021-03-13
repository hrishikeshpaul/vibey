import { SystemActionTypes } from "app/store/system/systemActionTypes";
import { UserData } from 'app/models/user.model';

export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";

export interface UserState {
  /**
   * Stores the user data in the state
   */
  user: UserData;
}

/**
 * Action called when the user sign in is successful
 * Payload consists of the user data
 */
export interface GetAuthSuccess {
  type: typeof GET_AUTH_SUCCESS;
  payload: UserData;
}

export type UserActionTypes = GetAuthSuccess | SystemActionTypes;
