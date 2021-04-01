import { Dispatch } from "redux";
import {
  GET_AUTH_SUCCESS,
  UserActionTypes,
} from "app/store/user/userActionTypes";
import {
  GET_API_START,
  GET_API_FAILURE,
  GET_API_SUCCESS,
} from "app/store/system/systemActionTypes";
import { login, authorize } from "app/services/auth.service";


/*
 * Called from Home.tsx
 * login callback returns res.data (query string)
 * query string for forwarding to spotify login
 * spotify returns us to Redirect component
 */
export const getLoginRedirect = () => async (
  dispatch: Dispatch<UserActionTypes>
) => {
  dispatch({ type: GET_API_START });
  try {
    const res = await login();
    window.open(res.data, "_self");
  } catch (err) {
    dispatch({
      type: GET_API_FAILURE,
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
export const getAuthorization = (
  code: string | undefined,
  state: string | undefined
) => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({ type: GET_API_START });

  try {
    const res = await authorize(code, state);
    console.log(res)
    dispatch({
      type: GET_AUTH_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: GET_API_SUCCESS,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_API_FAILURE,
      payload: err.response.data,
    });
  }
};
