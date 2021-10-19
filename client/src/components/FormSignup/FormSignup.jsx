import React, { useState } from 'react';

export default function FormSignup() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [offeringName, setOfferingName] = useState('');
  const [offeringDesc, setOfferingDesc] = useState('');

  return (
    <form>
      <label htmlFor="input-fname">
        First Name:
        <input id="input-fname" name="fname" type="text" placeholder="Enter your first name" value={fname} onChange={(e) => setFName(e.target.value)} />
      </label>
      <label htmlFor="input-lname">
        Last Name:
        <input id="input-lname" name="lname" type="text" placeholder="Enter your last name" value={lname} onChange={(e) => setLName(e.target.value)} />
      </label>
      <label htmlFor="input-email">
        Email:
        <input id="input-email" name="email" type="text" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="input-password">
        Password:
        <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label htmlFor="input-offeringname">
        Offering Name:
        <input id="input-offeringname" name="offeringname" type="text" placeholder="Brief name of what you are offering to mentor" value={offeringName} onChange={(e) => setOfferingName(e.target.value)} />
      </label>
      <label htmlFor="input-offeringdesc">
        Offering Description:
        <input id="input-offeringdesc" name="offeringdesc" type="text" placeholder="A longer description of what you are offering" value={offeringDesc} onChange={(e) => setOfferingDesc(e.target.value)} />
      </label>
    </form>
  );
}

/*
first name,
last name,
email,
password,
offering name,
offering description,
availabilities of offering - an arbitrary (!?) number of start and end times...

*/
