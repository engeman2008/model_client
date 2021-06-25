import React from 'react';
// import ReactJson from 'react-json-view';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CreateModel from './components/create-model';
// import Model from './components/model.component';

const App = () => (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/models" className="navbar-brand">
        Models
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/models" className="nav-link">
            Models
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link">
            Create
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path="/create" component={CreateModel} />
        <Route path="/model/:id" component={Model} />
        {/* <Route path="/model/:id/deltas" component={Model} /> */}
      </Switch>
    </div>
  </div>
);

export default App;
