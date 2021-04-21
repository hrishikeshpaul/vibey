import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "app/modules/redirect/Redirect";
import "./App.scss";
import Landing from "./modules/landing/landing";
import Home from "./modules/home/home";
import { PrivateRoute, PublicRoute } from "./utils/PrivateRoute";
import Loading from 'app/components/loading/loading';
import Room from 'app/modules/Room/Room';
import Navbar from 'app/modules/navbar/navbar';

const App = () => {
  const isLoading = useSelector((state: any) => {
    return state.system.isLoading;
  });

  return (
    <div className="bg-dark h-100 text-white w-100">
      <Loading show={isLoading}></Loading>
      <Navbar></Navbar>
      <Router>
        <Switch>
          <PublicRoute path="/" component={Landing} exact />
          <PublicRoute path="/login" component={Redirect} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/room" component={Room} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
