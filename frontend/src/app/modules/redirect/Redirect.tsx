import React, { useEffect } from "react";
import { getQueryParams } from "app/hooks/useQuery";
import { useDispatch } from "react-redux";
// useSelector can be imported in the above module to access state from the app
import { getAuthorization } from "app/store/user/userActions";

const Redirect = (props: any) => {
  const dispatch = useDispatch();

  // use the following code to access global state from components
  // this example demonstrates accessing the auth reducer's state
  // const authState = useSelector((state: RootStore) => state.auth);

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
        // The only promise is getAuthorization, which should inherently take care of error handling, so perhaps we don't need this catch?
      }
    };
    fetchData();
  }, []);

  return <div>Redirecting...</div>;
};

export default Redirect;
