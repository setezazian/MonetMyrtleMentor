import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function FormSignup({ isMentor }) {
  const history = useHistory();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [offeringName, setOfferingName] = useState('');
  const [offeringDesc, setOfferingDesc] = useState('');
  const [availabilities, setAvailabilities] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(new Date().toTimeString().slice(0, 5));
  const [endTime, setEndTime] = useState(new Date().toTimeString().slice(0, 5));

  useEffect(() => {
    console.log('availabilities array has changed to: ', availabilities);
  }, [availabilities]);

  const addAvailabilitiesHandler = () => {
    console.log('What format does the date/time picker have? ', typeof startTime);
    console.log(startTime);
    console.log(endTime);
    const newTimeBlock = {
      startTime: new Date(`${date} ${startTime}`).toISOString(),
      endTime: new Date(`${date} ${endTime}`).toISOString(),
    };
    const newAvailabilities = [...availabilities];
    newAvailabilities.push(newTimeBlock);
    setAvailabilities(newAvailabilities);
  };

  const validatePassword = () => {
    const passwordField = document.getElementById('input-password');
    const confirmPasswordField = document.getElementById('input-confirmpassword');

    if (passwordField.value !== confirmPasswordField.value) {
      confirmPasswordField.setCustomValidity('Passwords do not match');
    } else {
      confirmPasswordField.setCustomValidity('');
    }
    confirmPasswordField.reportValidity();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    validatePassword();

    const formData = {
      firstName: fname,
      lastName: lname,
      email,
      photoUrl,
      password,
      isMentor: !!isMentor,
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

    history.push('/offerings', { detail: [0, 1] });
  };

  const passwordChangeHandler = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if (e.target.name === 'confirmpassword') {
      setConfirmPwd(e.target.value);
      validatePassword();
    }
  };

  const mentorFormComponents = (
    <>
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
      <label htmlFor="input-date">
        Date:
        <input id="input-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label htmlFor="input-starttime">
        Start Time:
        <input id="input-starttime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        &nbsp;&nbsp;
      </label>
      <label htmlFor="input-endtime">
        End Time:
        <input id="input-endtime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      &nbsp;
      <button id="button-availabilityadd" type="button" onClick={addAvailabilitiesHandler}>Add</button>
      <br />
      <br />
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
    </>
  );

  return (
    <div>
      <form id="form-newuser">
        <label htmlFor="input-fname">
          First Name:&nbsp;
          <br />
          <input id="input-fname" name="fname" type="text" placeholder="Enter your first name" value={fname} onChange={(e) => setFName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="input-lname">
          Last Name:&nbsp;
          <br />
          <input id="input-lname" name="lname" type="text" placeholder="Enter your last name" value={lname} onChange={(e) => setLName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="input-email">
          Email:&nbsp;
          <br />
          <input id="input-email" name="email" type="text" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />

        <label htmlFor="input-photourl">
          URL to your photo:&nbsp;
          <br />
          <input id="input-photourl" name="photourl" type="text" placeholder="Enter your last name" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <br />
        <label htmlFor="input-password">
          Password:&nbsp;
          <br />
          <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={passwordChangeHandler} />
        </label>
        <label htmlFor="input-confirmpassword">
          Confirm Password:&nbsp;
          <br />
          <input id="input-confirmpassword" name="confirmpassword" type="password" placeholder="Confirm the password" value={confirmPwd} onChange={passwordChangeHandler} />
        </label>
        <br />
        {isMentor ? mentorFormComponents : null}
        <button id="button-formsubmit" type="submit" onClick={formSubmitHandler}>Submit</button>
      </form>
    </div>
  );
}

/*
TODO:
availabilities of offering - an arbitrary (!?) number of start and end times...
*/
