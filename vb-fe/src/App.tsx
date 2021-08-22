import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { Home } from "core/home/Home";
import { Landing } from "core/landing/Landing";
import { Redirect } from "core/redirect/Redirect";
import { Room } from "core/room/Room";
import { useSocket } from "core/socket/useSocket";
import { Loading, RoomModal } from "components/index";
import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";

import { initHttp, TokenStorageKeys } from "util/Http";
import { resetApp } from "util/Logout";
import "App.scss";

export const App = (): JSX.Element => {
  const isLoading = useSelector((state: State) => state.system.isLoading);
  const isRoomModalOpen = useSelector((state: State) => state.system.roomModal.isOpen);
  const isAuthenticated = useSelector((state: State) => state.system.isAuthenticated);
  const currentRoom = useSelector((state: State) => state.room.currentRoom);
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
    const { connect } = useSocket();

    useEffect(() => {
      connect();
      initHttp();
    }, [connect]);

    useEffect(() => {
      if (!isAuthenticated) resetApp();
    }, [isAuthenticated]); // eslint-disable-line

    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room/:id">
          <Room />
        </Route>
      </Switch>
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
