import { SystemActionTypes } from "app/store/system/systemActionTypes";
import { UserData } from "app/models/user.model";

export const SET_USER = "SET_USER";

/**
 * Action called when the user sign in is successful
 * Payload consists of the user data
 */
export interface SetUser {
  type: typeof SET_USER;
  payload: UserData;
}

export type UserActionTypes = SetUser | SystemActionTypes;
