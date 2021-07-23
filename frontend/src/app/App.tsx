import React from "react";

import Loading from "app/components/Loading/Loading";
import { Home } from "app/modules/Home/Home";
import Landing from "app/modules/Landing/Landing";
import Redirect from "app/modules/Redirect/Redirect";

import { PrivateRoute, PublicRoute } from "app/utils/PrivateRoute";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "app/App.scss";

const App = () => {
    const isLoading = useSelector((state: any) => state.system.isLoading);

    return (
        <div className="bg-dark h-100 text-white w-100">
            <Loading show={isLoading} />
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
