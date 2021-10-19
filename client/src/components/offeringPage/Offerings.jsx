import React from 'react';
import Offering from './Offering.jsx';

// testArray is just a temp array to ensure the mapping worked correctly
// eventually it will be the array of objects returned from server/database
// that has all the information that will be passed as props to fill the card properly
// const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Offerings = (props) => {
  console.log(props)
  let testArray = props.location.state.detail;
  console.log('arrSend to offer', testArray)

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  var unique = testArray.filter(onlyUnique);
  console.log('unique',unique)
  return (
    // testArray.map(() => (
    //   <Offering
    //     name="Name"
    //     teaches="Teaches"
    //     star="Star Rating"
    //     desc="Course Description"
    //     photo="img url to be used in sourcecode"
    //   />
    // ))
    <h1>test</h1>
  );
}
export default Offerings;
