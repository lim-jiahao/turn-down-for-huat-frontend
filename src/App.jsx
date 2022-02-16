import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Header from './components/Header.jsx';
import LandingPage from './components/LandingPage.jsx';

const App = () => (

  <div className="App flex flex-col items-center">
    <Header />
    <LandingPage />
    <Router>
      <div className="body">
        <nav>
          <Link to="/test" exact>
            <div>Test</div>
          </Link>
          <Link to="/test2" exact>
            <div>Test2</div>
          </Link>
        </nav>

        <Switch>
          <Route path="/test2"><Test2 /></Route>
          <Route path="/test"><Test /></Route>
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;

const Test = () => (
  <div>Test</div>
);

const Test2 = () => (
  <div>Test2</div>
);