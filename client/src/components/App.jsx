import React from 'react';
import LandingPage from './LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Offerings from './offeringPage/Offerings.jsx';
import Navbar from './Navbar.jsx';
import Profile from './Profile/Profile.jsx';

const App = () => (
  // <div>
  //   Loading...
  // </div>
  <div>
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/offerings" component={Offerings} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
