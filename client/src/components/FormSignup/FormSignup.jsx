import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FormSignup() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isMentor, setIsMentor] = useState(true);
  const [offeringName, setOfferingName] = useState('');
  const [offeringDesc, setOfferingDesc] = useState('');
  const [availabilities, setAvailabilities] = useState([]);
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(new Date().toISOString());

  useEffect(() => {
    console.log('availabilities array has changed to: ', availabilities);
  }, [availabilities]);

  const addAvailabilitiesHandler = () => {
    console.log('What format does the date/time picker have? ', typeof startTime);
    console.log(startTime);
    console.log(endTime);
    const newTimeBlock = {
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };
    const newAvailabilities = [...availabilities];
    newAvailabilities.push(newTimeBlock);
    setAvailabilities(newAvailabilities);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      firstName: fname,
      lastName: lname,
      email,
      photoUrl,
      password,
      isMentor,
      offeringName,
      offeringDesc,
      availabilities,
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
    <div>
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
        <label htmlFor="input-photourl">
          URL to your photo:&nbsp;
          <input id="input-photourl" name="photourl" type="text" placeholder="Enter your last name" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <br />
        <label htmlFor="input-password">
          Password:&nbsp;
          <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <p>Are you signing up as a mentor?</p>
        <label htmlFor="input-ismentor-yes">
          Yes&nbsp;
          <input id="input-ismentor-yes" name="ismentor" type="radio" value="true" onChange={(e) => setIsMentor(e.target.value === 'true')} checked />
        </label>
        <br />
        <label htmlFor="input-ismentor-no">
          No&nbsp;
          <input id="input-ismentor-no" name="ismentor" type="radio" value="false" onChange={(e) => setIsMentor(e.target.value === 'true')} />
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
        <button id="button-availabilityadd" type="button" onClick={addAvailabilitiesHandler}>Add</button>
        <br />
        <br />
        <button id="button-formsubmit" type="submit" onClick={formSubmitHandler}>Submit</button>
        <p>You&apos;ve added the following blocks of time:</p>
        {availabilities.map((timeBlock) => (
          <>
            <p key={timeBlock.startTime.toString()}>
              Start:
              {timeBlock.startTime}
              <br />
              End:
              {timeBlock.endTime}
            </p>
          </>
        ))}
      </form>
      <br />
      <br />
    </div>
  );
}

/*
TODO:
availabilities of offering - an arbitrary (!?) number of start and end times...
*/
