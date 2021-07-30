import { Dispatch } from "redux";
import { UserActionTypes, UserConstants } from "_store/user/UserTypes";
import { SystemConstants, SystemActionTypes } from "_store/system/SystemTypes";
import { login, authorize, logout } from "services/Auth";

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
  (code: string | undefined, state: string | undefined, history: any) =>
  async (dispatch: Dispatch<UserActionTypes | SystemActionTypes>): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });

    try {
      const res = await authorize(code, state);
      const { accessToken, refreshToken, user } = res.data;

      localStorage.setItem("v-at", accessToken || "");
      localStorage.setItem("v-rt", refreshToken || "");
      localStorage.setItem("v-user", JSON.stringify(user));

      dispatch({
        type: SystemConstants.LOGIN,
        payload: true,
      });
      dispatch({
        type: UserConstants.SET,
        payload: res.data.user,
      });
      dispatch({ type: SystemConstants.SUCCESS });
      history.push("/");
    } catch (err) {
      console.log(err);
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
 * @param history router history
 */
export const onLogout =
  (history: any) =>
  async (dispatch: Dispatch<UserActionTypes | SystemActionTypes>): Promise<void> => {
    try {
      dispatch({ type: SystemConstants.LOADING });
      await logout();
      localStorage.removeItem("v-token");
      localStorage.removeItem("v-user");
      dispatch({
        type: UserConstants.SET,
        payload: {
          id: "",
          username: "",
          href: "",
          uri: "",
          email: "",
          display_name: "",
          image: "",
          likes: [],
        },
      });
      dispatch({
        type: SystemConstants.LOGIN,
        payload: false,
      });
      dispatch({
        type: SystemConstants.SUCCESS,
      });
      history.push("/");
    } catch (err) {
      console.log(err);
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err.data,
      });
    }
  };
