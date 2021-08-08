import { AuthEndpoints } from "util/Endpoints";
import { buildHeaders, Http, TokenStorageKeys } from "util/Http";

/*
 * login is called from Home
 * gets query from /api/auth/login with spotify login url, redirect uri, state, etc
 * on success, home forwards itself to the query url
 * TODO: fix "any"
 *
 */
export const login = async (): Promise<any> => {
  return Http.get(AuthEndpoints.LOGIN);
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
  return Http.get(AuthEndpoints.AUTHORIZE, {
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
  return Http.get(AuthEndpoints.VALIDATE, {
    headers: buildHeaders(),
  });
};

/**
 * Service to log the user out
 * Sends the JWT
 */
export const logout = async (): Promise<any> => {
  const jwt = localStorage.getItem(TokenStorageKeys.AT);
  return Http.post(AuthEndpoints.LOGOUT, { jwt });
};

export const refreshTokens = (): Promise<any> => {
  return Http.get(AuthEndpoints.REFRESH);
};
