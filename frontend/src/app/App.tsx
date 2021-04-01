import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Redirect from "app/modules/redirect/Redirect";

import "./App.scss";
import Landing from "./modules/landing/landing";
import Home from "./modules/home/home";

const App = () => {
  return (
    <div className="bg-dark h-100 text-white w-100">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Redirect} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
