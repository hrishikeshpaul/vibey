import { Error } from "app/models/system.model";

export const GET_API_START = "GET_API_START";
export const GET_API_FAILURE = "GET_API_FAILURE";
export const GET_API_SUCCESS = "GET_API_SUCCESS";

export interface SystemState {
  /**
   * Denotes if the system is in loading state
   */
  isLoading: boolean;
  /**
   * Stores the error
   * Will need to change this to store the status code and message
   */
  error: Error;
}

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

export type SystemActionTypes = GetApiStart | GetApiSuccess | GetApiFailure;
