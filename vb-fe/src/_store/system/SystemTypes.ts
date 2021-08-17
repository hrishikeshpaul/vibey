export enum SystemConstants {
  RESET = "RESET",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  LOGIN = "LOGIN",
  CREATE_ROOM_MODAL = "CREATE_ROOM_MODAL",
  EXPAND_BOTTOM_SHEET = "EXPAND_BOTTOM_SHEET",
  SOCKET = "SOCKET",
  RETRY = "RETRY",
  INITIALIZED = "INITIALIZED",
}

export interface ResetSystem {
  type: typeof SystemConstants.RESET;
}

/**
 * Action for when the request has started
 */
export interface GetApiStart {
  type: typeof SystemConstants.LOADING;
  payload?: string;
}

/**
 *  Action for when the request is successful
 */
export interface GetApiSuccess {
  type: typeof SystemConstants.SUCCESS;
}

/**
 * GetApiFailure should take an error message string as payload
 */
export interface GetApiFailure {
  type: typeof SystemConstants.FAILURE;
  payload: Error;
}

/**
 * Update the user"s login state
 */
export interface SetUserLogin {
  type: typeof SystemConstants.LOGIN;
  payload: boolean;
}

/**
 * Open or close create room modal
 */
export interface SetCreateRoomModal {
  type: typeof SystemConstants.CREATE_ROOM_MODAL;
  payload: boolean;
}

export interface SetExpandBottomSheet {
  type: typeof SystemConstants.EXPAND_BOTTOM_SHEET;
  payload: boolean;
}

export interface SetRetry {
  type: typeof SystemConstants.RETRY;
  payload: boolean;
}

export interface SetSystemInitialize {
  type: typeof SystemConstants.INITIALIZED;
  payload: boolean;
}

export type SystemActionTypes =
  | ResetSystem
  | GetApiStart
  | GetApiSuccess
  | GetApiFailure
  | SetUserLogin
  | SetCreateRoomModal
  | SetExpandBottomSheet
  | SetRetry
  | SetSystemInitialize;
