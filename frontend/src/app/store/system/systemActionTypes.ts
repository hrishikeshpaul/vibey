export const GET_API_START = "GET_API_START";
export const GET_API_FAILURE = "GET_API_FAILURE";
export const GET_API_SUCCESS = "GET_API_SUCCESS";

export interface SystemState {
  isLoading: boolean;
  error: "";
}

export interface GetApiStart {
  type: typeof GET_API_START;
}

export interface GetApiSuccess {
  type: typeof GET_API_SUCCESS;
}

// GetApiFailure should take an error message string as payload
export interface GetApiFailure {
  type: typeof GET_API_FAILURE;
  payload: string;
}

export type SystemActionTypes = GetApiStart | GetApiSuccess | GetApiFailure;
