import React, { useEffect, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAuthorization } from "_store/user/UserActions";

export const Redirect: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  /*
   * useEffect on initial render only
   * pulls code and state from query
   * calls getAuthorization (state api call with authorize() service) with code & state args
   * authorize returns data from backend, res.data => state.auth.user
   *
   */

  useEffect(() => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const [code, state] = [params.code, params.state];
      dispatch(getAuthorization(code, state));
      history.push("/");
    } catch (err) {
      console.log(err);
      // The only promise is getAuthorization, which should inherently take care of error handling, so perhaps we don"t need this catch?
    }
  }, [history, dispatch]);

  return <div>Redirecting...</div>;
};
