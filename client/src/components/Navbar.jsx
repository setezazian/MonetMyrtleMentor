import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {pageIdxContext} from './App.jsx';
import axios from 'axios';

export default function Navbar(props) {
  const history = useHistory();
  const {pageIdx, setPageIdx} = useContext(pageIdxContext);
  const [searchTerm, setSearchTerm] = useState('');
  const matchArr = [];
  const handleClick = (e) => {

    setPageIdx(1);
    axios.get('/api/allOfferings')
    .then((res) => {
      return (res.data)
    })
    .then((results) => {
      if(searchTerm !== '') {
      results.forEach((element, index) => {
        for (let key in element) {
          console.log(element[key]);
          if(element[key].toLowerCase().includes(searchTerm.toLowerCase())) {
            matchArr.push(index);
          }

        }
      })
    }
    })
    .then(() => {
      // console.log(matchArr);
      history.push({
        pathname: '/offerings',
        state: { detail: matchArr}
      });
      while(matchArr.length > 0) {
        matchArr.pop();
    }
    })
    .catch((err) => {
      console.error(err);
    })



  }

  // const results = questions.filter((question) => {
  //   return question.question_body.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value);
  }

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
            <input type="text" id="searchBar" name="searchInput" placeholder="What do you want to learn?" onChange={handleChange}/>
            <span className='fas fa-search fa-lg searchIcon' onClick={handleClick}/>
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