import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "app/modules/redirect/Redirect";
import {ReactComponent as Loading} from 'assets/icons/loading.svg';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import "./App.scss";
import Landing from "./modules/landing/landing";
import Home from "./modules/home/home";
import { PrivateRoute, PublicRoute } from "./utils/PrivateRoute";
import { Modal } from "react-bootstrap";
import Icon from "./components/icon/icon";


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
        show={isLoading}
      >
        <Modal.Body className="text-center p-4 bg-secondary text-white font-weight-bold">
          <p className="mb-4">Loading...</p>
          <Icon Component={Loading}  size={[3, 2]} color="#4aaeae"></Icon>
        </Modal.Body>
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
