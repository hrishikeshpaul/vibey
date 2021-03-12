import React, { useEffect } from "react";
import { getQueryParams } from "app/hooks/useQuery";
// import { authorize } from "app/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "app/store/store";
import { getAuthorization } from "app/store/auth/authActions";

const Redirect = (props: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
