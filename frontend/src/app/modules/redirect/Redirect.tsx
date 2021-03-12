import React, { useEffect } from "react";
import axios from "axios";
import { getQueryParams } from "app/hooks/useQuery";
import { bindActionCreators } from "redux";

const Redirect = (props: any) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch an action, pass in code and state

        const results = getQueryParams(props.location.search);
        const [code, state] = [results.get("code"), results.get("state")];
        const res = await axios.get(
          `http://localhost:5555/api/auth/authorize?code=${code}&state=${state}`,
          { withCredentials: true }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return <div>Redirecting...</div>;
};

export default Redirect;
