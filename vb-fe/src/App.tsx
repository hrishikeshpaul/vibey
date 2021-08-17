import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { Home } from "core/home/Home";
import { Landing } from "core/landing/Landing";
import { Redirect } from "core/redirect/Redirect";
import { Room } from "core/room/Room";
import { Loading, CreateRoom } from "components/index";
import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";

import { initPipeline } from "util/System";

import { initHttp, TokenStorageKeys } from "util/Http";
import { resetApp } from "util/Logout";

import "App.scss";

export const App = (): JSX.Element => {
  const isLoading = useSelector((state: State) => state.system.isLoading);
  const isCreateRoomModalOpen = useSelector((state: State) => state.system.createRoomOpen);
  const isAuthenticated = useSelector((state: State) => state.system.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(TokenStorageKeys.AT)) {
      dispatch({ type: SystemConstants.LOGIN, payload: true });
    } else {
      dispatch({ type: SystemConstants.LOGIN, payload: false });
    }
  }, []); //eslint-disable-line

  const UnauthenticatedApp = (): JSX.Element => {
    return (
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Redirect />
        </Route>
      </Switch>
    );
  };

  const AuthenticatedApp = (): JSX.Element => {
    const { isSystemInit } = useSelector((state: State) => state.system);
    useEffect(() => {
      initHttp();
      initPipeline();
    }, []);

    useEffect(() => {
      if (!isAuthenticated) resetApp();
    }, [isAuthenticated]); // eslint-disable-line

    return isSystemInit ? (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room/:id">
          <Room />
        </Route>
      </Switch>
    ) : (
      <></>
    );
  };

  const render = useMemo(() => {
    return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  }, [isAuthenticated]); // eslint-disable-line

  return (
    <div className="h-100 w-100 px-3" id="vb-main">
      {isLoading && <Loading show />}
      {isCreateRoomModalOpen && (
        <CreateRoom
          open={isCreateRoomModalOpen}
          handleError={(e) => {
            console.log(e);
          }}
        />
      )}
      {render}
    </div>
  );
};
