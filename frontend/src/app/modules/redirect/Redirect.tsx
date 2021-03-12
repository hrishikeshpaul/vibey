import React, { useEffect } from "react";
import { getQueryParams } from "app/hooks/useQuery";
import { authorize } from "app/services/auth.service";

const Redirect = (props: any) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch an action, pass in code and state
        const results = getQueryParams(props.location.search);
        const [code, state] = [results.get("code"), results.get("state")];
        const res = await authorize(code, state);
        console.log("authorize res: ", res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return <div>Redirecting...</div>;
};

export default Redirect;
