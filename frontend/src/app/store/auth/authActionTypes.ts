export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";

export interface AuthData {
  email: string;
  display_name: string;
  image: string;
  likes: number[];
}
export interface GetAuthSuccess {
  type: typeof GET_AUTH_SUCCESS;
  payload: AuthData;
}

export type AuthDispatchTypes = GetAuthSuccess;
