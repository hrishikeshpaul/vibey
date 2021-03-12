import { Dispatch } from "redux";
import { GET_AUTH_SUCCESS, UserDispatchTypes } from "./userActionTypes";

import { authorize } from "app/services/auth.service";

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
) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  // dispatch({ type: API_LOADING })

  try {
    const res = await authorize(code, state);
    dispatch({
      type: GET_AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    //  dispatch({ type: API_FAILURE })
  }
};
