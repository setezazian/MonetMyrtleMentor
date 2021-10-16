import React from 'react';
import Navbar from './Navbar.jsx';

export default function () {
  return (
    <Navbar>
      <li className='logo-container'>
        <a herf="#" className='logo'>
          <span>M</span>
        </a>
      </li>
      <li className='searchBar-container'>
        <a herf="#" className='searchBar'>
          <span className='fas fa-search fa-lg searchIcon' />
        </a>
      </li>
      <li className='login-container'>
        <a herf="#" className='login-button'>
          Log in
        </a>
      </li>
    </Navbar>
  )
}