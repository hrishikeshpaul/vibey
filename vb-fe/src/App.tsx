import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import { Home } from "core/home/Home";
import { Landing } from "core/landing/Landing";
import { Redirect } from "core/redirect/Redirect";
import { Loading, CreateRoom } from "components/index";
import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";

import "App.scss";
import { useSocket } from "core/socket/useSocket";
import { RoomForm } from "util/Room";
import { createRoomAction } from "_store/room/RoomActions";
import { initHttp, TokenStorageKeys } from "util/Http";
import { checkLogin } from "services/Auth";

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
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <Redirect />
          </Route>
        </Switch>
      </Router>
    );
  };

  const AuthenticatedApp = (): JSX.Element => {
    const { connect } = useSocket();

    useEffect(() => {
      connect();
      initHttp();
    }, [connect]);

    return (
      <Router>
        <Switch>
          <Route path="/room">
            <div>This is a room!</div>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  };

  const render = useMemo(() => {
    return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  }, [isAuthenticated]);

  const onCreateModalClose = () => {
    dispatch({
      type: SystemConstants.CREATE_ROOM_MODAL,
      payload: false,
    });
  };

  return (
    <div className="h-100 w-100 px-3">
      {isLoading && <Loading show />}
      {isCreateRoomModalOpen && (
        <CreateRoom
          open={isCreateRoomModalOpen}
          close={onCreateModalClose}
          submit={(room: RoomForm) => {
            console.log(room);
            dispatch(createRoomAction(room));
            onCreateModalClose();
          }}
          handleError={(e) => {
            console.log(e);
          }}
        />
      )}
      {render}
    </div>
  );
};
