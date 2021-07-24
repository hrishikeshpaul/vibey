import React, { useEffect } from "react";
import { getQueryParams } from "app/hooks/useQuery";
import { useDispatch } from "react-redux";
import { getAuthorization } from "app/store/user/userActions";
import { useHistory } from "react-router-dom";

export const Redirect = (props: any) => {
  const { location } = props;
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
    const fetchData = async () => {
      try {
        /*
         * The following two lines can likely be aggregated & made into a custom hook
         * will look into that soon.
         *
         */
        const results = getQueryParams(location.search);
        const [code, state] = [results.get("code"), results.get("state")];
        dispatch(getAuthorization(code, state, history));
      } catch (err) {
        console.log(err);
        // The only promise is getAuthorization, which should inherently take care of error handling, so perhaps we don"t need this catch?
      }
    };
    fetchData();
  }, [history, dispatch, location]);

  return <div>Redirecting...</div>;
};
