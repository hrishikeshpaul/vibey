import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  path: RouteProps["path"];
  exact?: RouteProps["exact"];
  component: React.ElementType;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  return (
    <Route
      render={() =>
        localStorage.getItem("v-token") ? <Component /> : <Redirect to="/" />
      }
    />
  );
};

export const PublicRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        localStorage.getItem("v-token") === null ? <Component  {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
