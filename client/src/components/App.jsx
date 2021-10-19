import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import Offerings from './offeringPage/Offerings.jsx';
import ProfilePage from './ProfilePage/index.jsx';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/offerings" component={Offerings} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
