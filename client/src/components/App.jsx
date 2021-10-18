import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Offerings from './offeringPage/Offerings.jsx';

const App = () => (
  // <div>
  //   Loading...
  // </div>
  <div>
    <BrowserRouter>
      <Route exact path="/offerings" component={Offerings} />
    </BrowserRouter>
  </div>
);

export default App;
