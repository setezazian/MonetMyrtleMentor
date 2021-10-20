import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { pageIdxContext } from './App.jsx';

export default function Navbar(props) {
  const history = useHistory();
  const { pageIdx, setPageIdx } = useContext(pageIdxContext);
  const [searchTerm, setSearchTerm] = useState('');
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

  const onKeyDown = () => {
    console.log('keydown');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo-container">
          <span
            role="button"
            tabIndex={0}
            onClick={() => { setPageIdx(0); history.push('/'); }}
            onKeyDown={onKeyDown}
            className="logo"
          >
            M
          </span>
        </li>
        <li className="searchBar-container">
          <div className="searchBar">
            <input type="text" id="searchBar" name="searchInput" placeholder="What do you want to learn?" onChange={handleChange} />
            <span
              role="button"
              tabIndex={0}
              className="fas fa-search fa-lg searchIcon"
              onClick={handleClick}
              onKeyDown={onKeyDown}
              aria-label="Search Bar"
            />

          </div>
        </li>
        <li className="login-container">
          <button
            type="button"
            className="login-button"
          >
            Log in
          </button>
        </li>
      </ul>
    </nav>
  );
}