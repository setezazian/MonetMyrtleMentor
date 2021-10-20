import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import Offerings from './offeringPage/Offerings.jsx';
import ContactModal from './offeringPage/ContactModal.jsx';
import Navbar from './Navbar.jsx';
import Profile from './Profile/Profile.jsx';
import FormSignup from './FormSignup/FormSignup.jsx';
import FormLogin from './FormSignup/FormLogin.jsx';

const pageIdxContext = React.createContext();
const App = () => {
  const [pageIdx, setPageIdx] = useState(-1);
  return (
  // <div>
  //   Loading...
  // </div>
    <pageIdxContext.Provider value={{ pageIdx, setPageIdx }}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/offerings/contact" component={ContactModal} />
            <Route path="/offerings" component={Offerings} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/signup" component={FormSignup} />
            <Route exact path="/login" component={FormLogin} />
          </Switch>
        </BrowserRouter>
      </div>
    </pageIdxContext.Provider>
  );
};

export default App;
export { pageIdxContext };
