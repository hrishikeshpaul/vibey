import React, { useEffect, useMemo, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { WebPlaybackSDK } from "core/player/index";

import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";
import { Loading, CreateRoom } from "components";
import { PlayerWrapper } from "components/player/PlayerWrapper";
import { Home, Landing, Redirect, Room } from "core/index";
import { initHttp, TokenStorageKeys } from "util/Http";
import { resetApp } from "util/Logout";
import { initPipeline } from "util/System";

import "App.scss";

export const App = (): JSX.Element => {
  const { isLoading, isAuthenticated } = useSelector((state: State) => state.system);
  const isCreateRoomModalOpen = useSelector((state: State) => state.system.createRoomOpen);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.getItem(TokenStorageKeys.AT)) {
  //     dispatch({ type: SystemConstants.LOGIN, payload: true });
  //   } else {
  //     dispatch({ type: SystemConstants.LOGIN, payload: false });
  //   }
  // }, []); //eslint-disable-line
  useEffect(() => {
    initPipeline();
  }, []);

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
    useEffect(() => {
      if (isAuthenticated) initPipeline();
    }, [isAuthenticated]); // eslint-disable-line

    const getOAuthToken = useCallback((callback) => callback(localStorage.getItem(TokenStorageKeys.SpotifyAT)), []);

    return (
      <WebPlaybackSDK deviceName="Vibey Player" getOAuthToken={getOAuthToken} volume={0.5}>
        <PlayerWrapper />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/room/:id">
            <Room />
          </Route>
        </Switch>
      </WebPlaybackSDK>
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
