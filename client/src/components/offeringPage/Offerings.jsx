import React from 'react';
import Offering from './Offering.jsx';

// testArray is just a temp array to ensure the mapping worked correctly
// eventually it will be the array of objects returned from server/database
// that has all the information that will be passed as props to fill the card properly
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Offerings = () => (
  testArray.map(() => (
    <Offering
      name="Name"
      teaches="Teaches"
      star="Star Rating"
      desc="Course Description"
      photo="img url to be used in sourcecode"
    />
  ))
);
export default Offerings;
