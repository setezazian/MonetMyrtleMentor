import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {pageIdxContext} from './App.jsx';

export default function Navbar(props) {
  const history = useHistory();
  const {pageIdx, setPageIdx} = useContext(pageIdxContext);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className='logo-container'>
          <a herf="#" className='logo'>
            <span onClick={ () => { setPageIdx(0); history.push('/');}}>M</span>
          </a>
        </li>
        <li className='searchBar-container'>
          <div className='searchBar'>
            <input type="text" id="searchBar" name="searchInput" />
            <span className='fas fa-search fa-lg searchIcon' onClick={() => {setPageIdx(1); history.push('/offerings'); }}/>
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