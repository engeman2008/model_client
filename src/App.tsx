import React from 'react';
// import ReactJson from 'react-json-view';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CreateModel from './components/create-model';
import FindModel from './components/find-model';

const App = () => (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">

      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/create" className="nav-link">
            Create
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/find" className="nav-link">
            Find
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path="/create" component={CreateModel} />
        <Route path="/find" component={FindModel} />
        {/* <Route path="/model/:id/deltas" component={Model} /> */}
      </Switch>
    </div>
  </div>
);

export default App;
