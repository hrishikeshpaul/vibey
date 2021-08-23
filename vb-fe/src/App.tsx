import React, { useEffect, useMemo, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { WebPlaybackSDK } from "core/player";
import { Home, Landing, Redirect, Room } from "core";
import { Loading, RoomModal } from "components";
import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";

import { initPipeline } from "util/System";

import { initHttp, TokenStorageKeys } from "util/Http";
import { resetApp } from "util/Logout";

import "App.scss";
import { PlayerWrapper } from "components/player/PlayerWrapper";

export const App = (): JSX.Element => {
  const isRoomModalOpen = useSelector((state: State) => state.system.roomModal.isOpen);
  const currentRoom = useSelector((state: State) => state.room.currentRoom);
  const { isLoading, isAuthenticated } = useSelector((state: State) => state.system);
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
    useEffect(() => {
      initHttp();
      initPipeline();
    }, []);

    useEffect(() => {
      if (!isAuthenticated) resetApp();
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
      {isRoomModalOpen && (
        <RoomModal
          open={isRoomModalOpen}
          handleError={(e) => {
            console.log(e);
          }}
          currentRoom={currentRoom !== null ? currentRoom : undefined}
        />
      )}
      {render}
    </div>
  );
};
