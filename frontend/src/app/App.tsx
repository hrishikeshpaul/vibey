import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import Home from './modules/home/home'

const App = () => {
  return (
    <div className="bg-dark h-100 text-white w-100">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/foo" component={Foo} />
              <Route exact path="/bar" component={Bar} /> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
