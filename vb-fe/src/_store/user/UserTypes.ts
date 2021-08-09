export enum UserConstants {
  SET = "SET_USER",
  RESET = "RESET",
}

/**
 * Action called when the user sign in is successful
 * Payload consists of the user data
 */
export interface SetUser {
  type: typeof UserConstants.SET;
  payload: any;
}

/**
 * Resets the user state to initial on logout
 */
export interface ResetUserState {
  type: typeof UserConstants.RESET;
}

export type UserActionTypes = SetUser | ResetUserState;
