import { Error } from "app/models/system.model";

export const GET_API_START = "GET_API_START";
export const GET_API_FAILURE = "GET_API_FAILURE";
export const GET_API_SUCCESS = "GET_API_SUCCESS";
export const SET_USER_LOGIN = "SET_USER_LOGIN";
export const SET_CREATE_ROOM_MODAL = "SET_CREATE_ROOM_MODAL";
export const SET_EDIT_ROOM_MODAL = "SET_EDIT_ROOM_MODAL";

/**
 * Action for when the request has started
 */
export interface GetApiStart {
  type: typeof GET_API_START;
}

/**
 *  Action for when the request is successful
 */
export interface GetApiSuccess {
  type: typeof GET_API_SUCCESS;
}

/**
 * GetApiFailure should take an error message string as payload
 */
export interface GetApiFailure {
  type: typeof GET_API_FAILURE;
  payload: Error;
}

/**
 * Update the user's login state
 */
export interface SetUserLogin {
  type: typeof SET_USER_LOGIN;
  payload: boolean;
}

/**
 * Open or close create room modal
 */
export interface SetCreateRoomModal {
  type: typeof SET_CREATE_ROOM_MODAL;
  payload: boolean;
}

/**
 * Open or close edit room modal
 */
export interface SetEditRoomModal {
  type: typeof SET_EDIT_ROOM_MODAL;
  payload: boolean;
}

export type SystemActionTypes = GetApiStart | GetApiSuccess | GetApiFailure | SetUserLogin | SetCreateRoomModal;
