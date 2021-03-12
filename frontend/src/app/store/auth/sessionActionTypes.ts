export const GET_SESSION_LOADING = "GET_SESSION_LOADING";
export const GET_SESSION_SUCCESS = "GET_SESSION_SUCCESS";
export const GET_SESSION_FAIL = "GET_SESSION_FAIL";

export interface SessionData {
  session: any;
  email: string;
  username: string;
  firstName: string;
  likes: number[];
}
export interface GetSessionSuccess {
  type: typeof GET_SESSION_SUCCESS;
  payload: SessionData;
}
export interface GetSessionLoading {
  type: typeof GET_SESSION_LOADING;
}
export interface GetSessionFail {
  type: typeof GET_SESSION_FAIL;
}
