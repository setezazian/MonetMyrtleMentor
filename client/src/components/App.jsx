import React, {useState, createContext} from 'react';
import LandingPage from './LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Offerings from './offeringPage/Offerings.jsx';
import Navbar from './Navbar.jsx';
import Profile from './Profile/Profile.jsx';

const pageIdxContext = React.createContext();
const App = () => {
  const [pageIdx, setPageIdx] = useState(-1);
  return (
      // <div>
      //   Loading...
      // </div>
        <pageIdxContext.Provider value={{pageIdx, setPageIdx}}>
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
        </pageIdxContext.Provider>
  )
}

export default App;
export { pageIdxContext }
