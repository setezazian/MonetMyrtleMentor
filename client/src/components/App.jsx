import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './LandingPage/LandingPage.jsx';
import Offerings from './offeringPage/Offerings.jsx';
import ContactModal from './offeringPage/ContactModal.jsx';
import ScheduleModal from './offeringPage/ScheduleModal.jsx';
import Navbar from './Navbar.jsx';
import Profile from './Profile/Profile.jsx';
import FormSignup from './Forms/FormSignup.jsx';
import FormLogin from './Forms/FormLogin.jsx';
import Debug from './Debug/Debug.jsx';
import pageIdxContext, { loginContext, loginProfileContext } from '../context.jsx';
import CustomCursor from './CustomCursor/CustomCursor.jsx';

const App = () => {
  const [pageIdx, setPageIdx] = useState(-1);
  const [login, setLogin] = useState(false);
  const [loginIdx, setLoginIdx] = useState(-1);

  useEffect(() => {
    axios.get('/api/me')
      .then((response) => {
        setLoginIdx(response.data.profile_id);
        setLogin(true);
      })
      .catch((err) => console.log('Not currently logged in. ', err));
  }, []);

  return (
    // <div>
    //   Loading...
    // </div>
    <loginProfileContext.Provider value={{ loginIdx, setLoginIdx }}>
      <loginContext.Provider value={{ login, setLogin }}>
        <pageIdxContext.Provider value={{ pageIdx, setPageIdx }}>
          <div>
            <BrowserRouter>
              <CustomCursor />
              <Navbar />
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/offerings/contact" component={ContactModal} />
                <Route path="/offerings/availabillity" component={ScheduleModal} />
                <Route path="/offerings" component={Offerings} />
                <Route path="/profile" component={Profile} />
                <Route exact path="/signup" component={FormSignup} />
                <Route exact path="/login" component={FormLogin} />
                <Route exact path="/debug" component={Debug} />
              </Switch>
            </BrowserRouter>
          </div>
        </pageIdxContext.Provider>
      </loginContext.Provider>
    </loginProfileContext.Provider>

  );
};

export default App;
