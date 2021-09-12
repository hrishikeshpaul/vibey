import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

import { UserActionTypes, UserConstants } from "_store/user/UserTypes";
import { SystemConstants, SystemActionTypes } from "_store/system/SystemTypes";
import { login, authorize, logout } from "services/Auth";
import { HttpStatus, TokenStorageKeys } from "util/Http";
import { resetApp } from "util/Logout";
import { getMe } from "services/User";

export const getMeAction =
  () =>
  async (dispatch: Dispatch<UserActionTypes | SystemActionTypes>): Promise<void> => {
    try {
      const response = await getMe();
      dispatch({ type: UserConstants.SET, payload: response.data });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

/*
 * Called from Home.tsx
 * login callback returns res.data (query string)
 * query string for forwarding to spotify login
 * spotify returns us to Redirect component
 */
export const getLoginRedirect =
  () =>
  async (dispatch: Dispatch<UserActionTypes | SystemActionTypes>): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });
    try {
      const res = await login();
      window.open(res.data, "_self");
      dispatch({ type: SystemConstants.SUCCESS });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

/*
 * getAuthorization uses authorize() service
 * authorizes state backend
 * if success, returns user, user is set to state
 * API_LOADING and API_FAILURE dispatches should likely be created
 * Wondering where to store API_LOADING and API_FAILURE, apiReducer?
 * string | undefined feels messy
 *
 */
export const getAuthorization =
  (code: string | undefined, state: string | undefined) =>
  async (dispatch: Dispatch<UserActionTypes | SystemActionTypes>): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });

    try {
      const res = await authorize(code, state);
      const { accessToken, refreshToken, spotifyAccessToken, spotifyRefreshToken } = res.data;

      localStorage.setItem(TokenStorageKeys.AT, accessToken);
      localStorage.setItem(TokenStorageKeys.RT, refreshToken);
      localStorage.setItem(TokenStorageKeys.SpotifyAT, spotifyAccessToken);
      localStorage.setItem(TokenStorageKeys.SpotifyRT, spotifyRefreshToken);

      dispatch({
        type: SystemConstants.LOGIN,
        payload: true,
      });
      dispatch({
        type: UserConstants.SET,
        payload: res.data.user,
      });
      dispatch({ type: SystemConstants.SUCCESS });
    } catch (err) {
      // should go to login page
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err.data,
      });
    }
  };

/**
 * Logs the user out
 * makes an API call to clear the JWT from the backend
 *
 */
export const onLogout =
  () =>
  async (dispatch: Dispatch<CallHistoryMethodAction | SystemActionTypes>): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });
    try {
      setTimeout(async () => {
        const res = await logout();
        if (res.status === HttpStatus.NoContent) {
          resetApp("UserAction.ts");
          dispatch(push("/"));
        }
      }, 2000);
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err.data,
      });
    }
  };
