import React from 'react';
import Navbar from '../Navbar.jsx';

export default function LandingPage() {
  return (
    <React.Fragment>
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