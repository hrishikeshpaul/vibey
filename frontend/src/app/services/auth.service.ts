import { LOGIN_URL, AUTHORIZE_URL, LOGOUT_URL, CHECK_AUTH_URL } from "app/static/url";
import axios from "app/hooks/useAxios";

/*
 * login is called from Home
 * gets query from /api/auth/login with spotify login url, redirect uri, state, etc
 * on success, home forwards itself to the query url
 * TODO: fix "any"
 *
 */
export const login = async (): Promise<any> => {
  return axios.get(LOGIN_URL);
};

/*
 * authorize is called from Redirect
 * passes code and state to be added as query params
 * back-end verifies states
 * TODO: fix "any" return
 * TODO: fix undefined type ??
 *
 */
export const authorize = async (code: string | undefined, state: string | undefined): Promise<any> => {
  return axios.get(AUTHORIZE_URL, {
    params: {
      code,
      state,
    },
  });
};

/**
 * Makes an API call to see if the current JWT stored is
 * valid or not
 * @param jwt jwt from the local storage
 */
export const checkLogin = async (): Promise<any> => {
  const jwt = localStorage.getItem("v-token");
  return axios.post(CHECK_AUTH_URL, { jwt });
};

/**
 * Service to log the user out
 * Sends the JWT
 */
export const logout = async (): Promise<any> => {
  const jwt = localStorage.getItem("v-token");
  return axios.post(LOGOUT_URL, { jwt });
};
