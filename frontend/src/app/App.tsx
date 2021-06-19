<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "app/modules/Redirect";
import "./App.scss";
import Landing from "./modules/Landing";
import Home from "./modules/Home";
import { PrivateRoute, PublicRoute } from "./utils/PrivateRoute";
=======
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Redirect from 'app/modules/Redirect';
import './App.scss';
import Landing from './modules/Landing';
import Home from './modules/Home';
import { PrivateRoute, PublicRoute } from './utils/PrivateRoute';
>>>>>>> bfe5db2eb650b5238552b0b349134d94e28b6e94
import Loading from 'app/components/Loading';

const App = () => {
 const isLoading = useSelector((state: any) => {
  return state.system.isLoading;
 });

 return (
  <div className="bg-dark h-100 text-white w-100">
   <Loading show={isLoading}></Loading>
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
