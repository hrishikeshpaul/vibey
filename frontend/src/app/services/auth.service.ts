import { LOGIN_URL, AUTHORIZE_URL } from "app/static/url";
import axios from "app/hooks/useAxios";

/*
 * login is called from Home
 * gets query from /api/auth/login with spotify login url, redirect uri, state, etc
 * on success, home forwards itself to the query url
 * TODO: fix 'any'
 *
 */
export const login = async (): Promise<any> => {
  return axios.get(LOGIN_URL);
};

/*
 * authorize is called from Redirect
 * passes code and state to be added as query params
 * back-end verifies states
 * TODO: fix 'any' return
 * TODO: fix undefined type ??
 *
 */
export const authorize = async (
  code: string | undefined,
  state: string | undefined
): Promise<any> => {
  return axios.get(AUTHORIZE_URL, {
    params: {
      code: code,
      state: state,
    },
  });
};

/**
 * 
 * @param jwt jwt from the local storage
 */
export const checkLogin = async() => {
  // make api call
  const jwt = localStorage.getItem('v-token')
  // const res = axios.get()
  return true
}