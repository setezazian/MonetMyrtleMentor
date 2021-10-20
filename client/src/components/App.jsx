import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import Offerings from './offeringPage/Offerings.jsx';
import ContactModal from './offeringPage/ContactModal.jsx';

const App = () => (
  // <div>
  //   Loading...
  // </div>
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/offerings/contact" component={ContactModal} />
        <Route path="/offerings" component={Offerings} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
