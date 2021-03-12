import React, { useEffect } from "react";
import { getQueryParams } from "app/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "app/store/store";
import { getAuthorization } from "app/store/auth/authActions";

const Redirect = (props: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.auth);

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
        const results = getQueryParams(props.location.search);
        const [code, state] = [results.get("code"), results.get("state")];
        dispatch(getAuthorization(code, state));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return <div>Redirecting...</div>;
};

export default Redirect;
