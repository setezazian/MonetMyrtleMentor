import React from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function Navbar(props) {
  const history = useHistory();

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className='logo-container'>
          <a herf="#" className='logo'>
            <span>M</span>
          </a>
        </li>
        <li className='searchBar-container'>
          <div className='searchBar'>
            <input type="text" id="searchBar" name="searchInput" />
            <span className='fas fa-search fa-lg searchIcon' onClick={() => history.push('/offerings')}/>
          </div>
        </li>
        <li className='login-container'>
          <a herf="#" className='login-button'>
            Log in
          </a>
        </li>
      </ul>
    </nav>
  );
}