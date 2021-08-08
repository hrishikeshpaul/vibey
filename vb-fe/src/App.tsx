import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";

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

export const App = (): JSX.Element => {
  const isLoading = useSelector((state: State) => state.system.isLoading);
  const isCreateRoomModalOpen = useSelector((state: State) => state.system.createRoomOpen);
  const isAuthenticated = useSelector((state: State) => state.system.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * If at and rt are present then get profile
   * This will be helpful when the user refreshes the page
   * If the AT/RT are valid then return data and then update the store and render the appropriate app
   * Need to have the socket stuff here aswell
   */
  useEffect(() => {
    if (localStorage.getItem("v-at")) {
      dispatch({
        type: SystemConstants.LOGIN,
        payload: true,
      });
    } else {
      dispatch({
        type: SystemConstants.LOGIN,
        payload: false,
      });
    }
  }, [dispatch, history]);

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
    }, [connect]);

    return (
      <Switch>
        <Route path="/room">
          <div>This is a room!</div>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  };

  const render = useMemo(() => {
    return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  }, [isAuthenticated]);

  const handleCloseModal = () => {
    dispatch({
      type: SystemConstants.CREATE_ROOM_MODAL,
      payload: false,
    });
  };

  const handleSubmitRoom = async (room: RoomForm) => {
    dispatch(createRoomAction(room));
    handleCloseModal();
    history.push("/room");
  };

  return (
    <div className="h-100 w-100 px-3">
      {isLoading && <Loading show />}
      {isCreateRoomModalOpen && (
        <CreateRoom
          open={isCreateRoomModalOpen}
          close={handleCloseModal}
          submit={(room: RoomForm) => {
            handleSubmitRoom(room);
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
