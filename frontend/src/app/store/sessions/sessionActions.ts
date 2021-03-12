import axios from "axios";
import { Dispatch } from "redux";

const GET_SESSION_LOADING = "GET_SESSION_LOADING";
const GET_SESSION_SUCCESS = "GET_SESSION_SUCCESS";
const GET_SESSION_FAIL = "GET_SESSION_FAIL";

export const getSession = () => async (dispatch: Dispatch) => {
  dispatch({
    type: GET_SESSION_LOADING,
  });
  axios
    .get("")
    .then((res) => {
      dispatch({
        type: GET_SESSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_SESSION_FAIL,
      });
    });
};
