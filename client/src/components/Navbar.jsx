import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { pageIdxContext } from './App.jsx';

export default function Navbar(props) {
  const history = useHistory();
  const { pageIdx, setPageIdx } = useContext(pageIdxContext);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const matchArr = [];
  const handleClick = (e) => {
    e.preventDefault();
    setPageIdx(1);
    axios.get('/api/allOfferings')
      .then((res) => res.data)
      .then((results) => {
        if (searchTerm !== '') {
          results.forEach((element, index) => {
            Object.values(element).forEach((v) => {
              if (v.toLowerCase().includes(searchTerm.toLowerCase())) {
                matchArr.push(index);
              }
            });
          });
        } else if (searchTerm === '') {
          matchArr.push(0);
          matchArr.push(1);
          matchArr.push(2);
          matchArr.push(3);
          matchArr.push(4);
          matchArr.push(5);
          matchArr.push(6);
          matchArr.push(7);
          matchArr.push(8);
          matchArr.push(9);
        }
      })
      .then(() => {
        history.push({
          pathname: '/offerings',
          state: { detail: matchArr },
        });
        while (matchArr.length > 0) {
          matchArr.pop();
        }
      })
      .catch((err) => {
        console.error(err);
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
            : <div className="offering-title">Immersive learning with the best mentors
                <div className="offering-sub">Teach or learn anything you want, learning can be so easy here</div>
              </div>}
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
        <li className={`${pageIdx === 0 ? 'login-container' : 'login-container2'}`}>
          <button
            type="button"
            className="login-button"
            onClick={() => history.push('/login')}
          >
            Log in
          </button>
        </li>
      </ul>
    </nav>
  );
}
