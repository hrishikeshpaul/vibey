import { Dispatch } from 'redux';
import { SET_USER, UserActionTypes } from 'app/store/user/userActionTypes';
import {
 GET_API_START,
 GET_API_FAILURE,
 GET_API_SUCCESS,
 SET_USER_LOGIN,
} from 'app/store/system/systemActionTypes';
import { login, authorize } from 'app/services/auth.service';

/*
 * Called from Home.tsx
 * login callback returns res.data (query string)
 * query string for forwarding to spotify login
 * spotify returns us to Redirect component
 */
export const getLoginRedirect =
 () => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({ type: GET_API_START });
  try {
   const res = await login();
   window.open(res.data, '_self');
   dispatch({ type: GET_API_SUCCESS });
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
export const getAuthorization =
 (code: string | undefined, state: string | undefined, history: any) =>
 async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({ type: GET_API_START });

  try {
   const res = await authorize(code, state);
   const token = res.data.token;
   localStorage.setItem('v-token', token ? token : '');
   localStorage.setItem('v-user', JSON.stringify(res.data.user));

   dispatch({
    type: SET_USER,
    payload: res.data.user,
   });
   dispatch({
    type: GET_API_SUCCESS,
   });
   history.push('/home');
  } catch (err) {
   console.log(err);
   dispatch({
    type: GET_API_FAILURE,
    payload: err.data,
   });
  }
 };

export const onLogout =
 (history: any) => (dispatch: Dispatch<UserActionTypes>) => {
  localStorage.removeItem('v-token');
  localStorage.removeItem('v-user');
  // make an api call here
  dispatch({
   type: SET_USER,
   payload: {
    id: '',
    username: '',
    href: '',
    uri: '',
    email: '',
    display_name: '',
    image: '',
    likes: [],
   },
  });
  dispatch({
   type: SET_USER_LOGIN,
   payload: false,
  });
  history.push('/');
 };
