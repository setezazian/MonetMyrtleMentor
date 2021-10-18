import React from 'react';
import LandingPage from './LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Offerings from './offeringPage/Offerings.jsx';

const App = () => (
  // <div>
  //   Loading...
  // </div>
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/offerings" component={Offerings} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
