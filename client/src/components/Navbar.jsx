import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import pageIdxContext, { loginContext, loginProfileContext } from '../context.jsx';
import Modal from './Modal/Modal.jsx';
import FormLogin from './Forms/FormLogin.jsx';

export default function Navbar() {
  const history = useHistory();
  const { pageIdx, setPageIdx } = useContext(pageIdxContext);
  const { login } = useContext(loginContext);
  const { loginIdx } = useContext(loginProfileContext);
  const [profilePic, setProfilePic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const [modalComp, setModalComp] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setPageIdx(1);
    history.push({
      pathname: '/offerings',
      state: { detail: searchTerm },
    });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log('value', e.target.value);
      searchRef.current.click();
    }
  };

  useEffect(() => {
  }, [login]);
  useEffect(() => {
    axios.post('/api/profile', { id: loginIdx })
      .then((res) => {
        if (res.data[0]) {
          setProfilePic(res.data[0].photo);
        }
      })
      .catch((err) => console.error(err));
  }, [loginIdx]);

  return (
    <nav className={`${pageIdx === 0 ? 'navbar' : 'navbar2'}`}>
      <ul className={`${pageIdx === 0 ? 'navbar-nav' : 'navbar-nav2'}`}>
        <li className={`${pageIdx === 0 ? 'logo-container' : 'logo-container2'}`}>
          <span
            role="button"
            tabIndex={0}
            onClick={() => { setPageIdx(0); history.push('/'); }}
            onKeyDown={onKeyDown}
            className={`${pageIdx === 0 ? 'logo' : 'logo2'}`}
          >
            M
          </span>
        </li>
        <li className={`${pageIdx === 0 ? 'searchBar-container' : 'searchBar-container2'}`}>
          {pageIdx === 0 ? null
            : (
              <div className="offering-title">
                Immersive learning with the best mentors
                <div className="offering-sub">
                  Teach or learn anything you want, learning can be so easy here
                </div>
              </div>
            )}
          <div className={`${pageIdx === 0 ? 'searchBar' : 'searchBar2'}`}>
            <input
              type="text"
              id="searchBar"
              name="searchInput"
              placeholder="What do you want to learn?"
              onChange={handleChange}
              onKeyDown={onKeyDown}
            />
            <span
              role="button"
              tabIndex={0}
              className="fas fa-search fa-lg searchIcon"
              onClick={handleClick}
              onKeyDown={onKeyDown}
              aria-label="Search Bar"
              ref={searchRef}
            />

          </div>
        </li>
        {login
          ? (
            <li className={`${pageIdx === 0 ? 'login-container' : 'login-container2'}`}>
              <button
                aria-label="login button"
                type="button"
                className="login-profile-button"
                style={{ backgroundImage: `url(${profilePic})` }}
                onClick={() => history.push('/profile')}
              />
            </li>
          )
          : (
            <li className={`${pageIdx === 0 ? 'login-container' : 'login-container2'}`}>
              <button
                aria-label="login button"
                type="button"
                className="login-button"
                onClick={() => setModalComp(<FormLogin setModal={setModalComp} />)}
              >
                Log in
              </button>
            </li>
          )}
      </ul>
      <Modal component={modalComp} setComponent={setModalComp} />
    </nav>
  );
}
