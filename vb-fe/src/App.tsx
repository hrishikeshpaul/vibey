import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import { Home } from "core/home/Home";
import { Landing } from "core/landing/Landing";
import { Redirect } from "core/redirect/Redirect";
import { Loading, CreateRoom } from "components/index";
import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";

import "App.scss";

export const App = (): JSX.Element => {
  const isLoading = useSelector((state: State) => state.system.isLoading);
  const isCreateRoomModalOpen = useSelector((state: State) => state.system.createRoomOpen);
  const isAuthenticated = useSelector((state: State) => state.system.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(isAuthenticated);

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
          submit={(room: any) => {
            console.log(room);
            onCreateModalClose();
          }}
          handleError={(e) => {
            console.log(e);
          }}
        />
      )}
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};
