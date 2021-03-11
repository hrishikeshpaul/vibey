import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./modules/home/home";
import "./App.scss";

function App() {
  return (
    <div className="bg-dark h-100 text-white w-100">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/foo" component={Foo} />
              <Route exact path="/bar" component={Bar} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
