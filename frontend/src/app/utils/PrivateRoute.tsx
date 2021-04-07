import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_USER_LOGIN } from "app/store/system/systemActionTypes";

type PrivateRouteProps = {
  path: RouteProps["path"];
  exact?: RouteProps["exact"];
  component: React.ElementType;
};

/**
 * Private route to ensure that components are rendered if the user is
 * logged in.
 * Also dispatches an action to update the state if the user is loggedin
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const dispatch = useDispatch();

  dispatch({
    type: SET_USER_LOGIN,
    payload: !!localStorage.getItem("v-token")
  });

  return (
    <Route
      render={() =>
        localStorage.getItem("v-token") ? <Component /> : <Redirect to="/" />
      }
    />
  );
};

/**
 * Public route to ensure that if the user is logged in then route to home
 * Dispatches an action to update the logged in state
 */
export const PublicRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const dispatch = useDispatch();
  const loggedIn = checkJWT();
  dispatch({
    type: SET_USER_LOGIN,
    payload: loggedIn
  });

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        !loggedIn ? <Component  {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

/**
 * Helper function to verify the JWT
 */
const checkJWT = () => {
  const token = localStorage.getItem('v-token');
  if(token === null || token === '') {
    return false;
  } else {
    return true;
  }
}
