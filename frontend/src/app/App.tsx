import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Redirect from "app/modules/redirect/Redirect";

import "./App.scss";
import Landing from "./modules/landing/landing";
import Home from "./modules/home/home";
import { PrivateRoute, PublicRoute } from "./utils/PrivateRoute";

const App = () => {
  return (
    <div className="bg-dark h-100 text-white w-100">
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
