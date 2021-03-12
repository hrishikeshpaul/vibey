import { Dispatch } from "redux";
import { GET_AUTH_SUCCESS, AuthDispatchTypes } from "./authActionTypes";

import { authorize } from "app/services/auth.service";

export const getAuthorization = (code: string, state: string) => async (
  dispatch: Dispatch<AuthDispatchTypes>
) => {
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
