// import { SystemActionTypes } from "app/store/system/systemActionTypes";
// import { UserData } from "app/models/user.model";

export enum UserConstants {
  SET = "SET_USER",
}

/**
 * Action called when the user sign in is successful
 * Payload consists of the user data
 */
export interface SetUser {
  type: typeof UserConstants.SET;
  payload: any;
}

export type UserActionTypes = SetUser;
