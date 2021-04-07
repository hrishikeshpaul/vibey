import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "app/modules/redirect/Redirect";

import "./App.scss";
import Landing from "./modules/landing/landing";
import Home from "./modules/home/home";
import { PrivateRoute, PublicRoute } from "./utils/PrivateRoute";
import { Modal } from "react-bootstrap";

const App = () => {
  const isLoading = useSelector((state: any) => {
    return state.system.isLoading;
  });

  return (
    <div className="bg-dark h-100 text-white w-100">
      <Modal
        size="sm"
        animation={true}
        centered
        show={false}
      >
      
        <Modal.Header className="bg-danger text-white text-center py-1">
            <Modal.Title className="text-center">
              <h5>Delete</h5>
            </Modal.Title>
          </Modal.Header>
      </Modal>
      <Router>
        <Switch>
          <PublicRoute path="/" component={Landing} exact />
          <PublicRoute path="/login" component={Redirect} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
