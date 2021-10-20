import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FormSignup() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [offeringName, setOfferingName] = useState('');
  const [offeringDesc, setOfferingDesc] = useState('');
  const [availability, setAvailability] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    console.log('Availability array has changed to: ', availability);
  }, [availability]);

  const addAvailabilityHandler = () => {
    console.log('What format does the date/time picker have? ', typeof startTime);
    console.log(startTime);
    console.log(endTime);
    const newTimeBlock = {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };
    const newAvailability = [...availability];
    newAvailability.push(newTimeBlock);
    setAvailability(newAvailability);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      firstName: fname,
      lastName: lname,
      email,
      password,
      offeringName,
      offeringDesc,
      availability,
    };

    axios.post('/api/user/new', formData)
      .then(() => {
        // POST and user creation is good, so move on to application
      })
      .catch((err) => {
        console.log('Error POSTing form data: ', err);
        // figure out the error and have user correct their form
      });
  };

  return (
    <form id="form-newuser">
      <label htmlFor="input-fname">
        First Name:&nbsp;
        <input id="input-fname" name="fname" type="text" placeholder="Enter your first name" value={fname} onChange={(e) => setFName(e.target.value)} />
      </label>
      <br />
      <label htmlFor="input-lname">
        Last Name:&nbsp;
        <input id="input-lname" name="lname" type="text" placeholder="Enter your last name" value={lname} onChange={(e) => setLName(e.target.value)} />
      </label>
      <br />
      <label htmlFor="input-email">
        Email:&nbsp;
        <input id="input-email" name="email" type="text" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="input-password">
        Password:&nbsp;
        <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label htmlFor="input-offeringname">
        Offering Name:&nbsp;
        <input id="input-offeringname" name="offeringname" type="text" placeholder="Brief name of what you are offering to mentor" value={offeringName} onChange={(e) => setOfferingName(e.target.value)} />
      </label>
      <br />
      <label htmlFor="input-offeringdesc">
        Offering Description:&nbsp;
        <input id="input-offeringdesc" name="offeringdesc" type="text" placeholder="A longer description of what you are offering" value={offeringDesc} onChange={(e) => setOfferingDesc(e.target.value)} />
      </label>
      <p>Add the blocks of time you want to have available to mentees:</p>
      <label htmlFor="input-starttime">
        Start Time:
        <input id="input-starttime" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        &nbsp;&nbsp;
      </label>
      <label htmlFor="input-endtime">
        End Time:
        <input id="input-endtime" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      &nbsp;
      <button id="button-availabilityadd" type="button" onClick={addAvailabilityHandler}>Add</button>
      <br />
      <br />
      <button id="button-formsubmit" type="submit" onClick={formSubmitHandler}>Submit</button>
    </form>
  );
}

/*
TODO:
availabilities of offering - an arbitrary (!?) number of start and end times...
*/
