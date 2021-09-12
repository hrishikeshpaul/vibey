import React, { useEffect, useMemo, useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";
import { getMeAction } from "_store/user/UserActions";
import { Loading, RoomModal, PlayerWrapper } from "components";
import { Home, Landing, Redirect, Room } from "core";
import { WebPlaybackSDK } from "core/player";
import { TokenStorageKeys } from "util/Http";
import { initPipeline } from "util/System";

import "App.scss";

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
    const { socketsConnected, httpConnected } = useSelector((state: State) => state.system);
    const { deviceId } = useSelector((state: State) => state.player);
    const [system, setSystem] = useState<boolean>(false);

    useEffect(() => {
      (async () => {
        await initPipeline();
        dispatch(getMeAction());
      })();
    }, []);

    useEffect(() => {
      if (httpConnected && deviceId) {
        setSystem(true);
      }
    }, [socketsConnected, httpConnected, deviceId]);

    const getOAuthToken = useCallback((callback) => callback(localStorage.getItem(TokenStorageKeys.SpotifyAT)), []);

    return (
      <WebPlaybackSDK deviceName="Vibey Player" getOAuthToken={getOAuthToken} volume={0.5}>
        <PlayerWrapper />
        {system ? (
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
        )}
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
          currentRoom={currentRoom}
        />
      )}
      {render}
    </div>
  );
};
