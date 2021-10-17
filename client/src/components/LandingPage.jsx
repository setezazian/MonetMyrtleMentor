import React from 'react';
import Navbar from './Navbar.jsx';
//import landingPagePic from '../../dist/landingPage.jpg'

export default function () {
  return (
    <React.Fragment>

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
      <div className='landingPage-container'>
        <img src='./landingPage.jpg' alt='style image' className='image' />
        <div className='title'>
          MentorUP
        </div>
        <div className='subtitle'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et j
        </div>
        <button className='imStudent'>I'm a student</button>
        <button className='imMentor'>I'm a mentor</button>
      </div>
    </React.Fragment>

  )
}