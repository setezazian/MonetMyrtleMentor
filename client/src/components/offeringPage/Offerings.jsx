import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';
// testArray is just a temp array to ensure the mapping worked correctly
// eventually it will be the array of objects returned from server/database
// that has all the information that will be passed as props to fill the card properly
// const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Offerings = (props) => {
  console.log(props);
  let testArray = props.location.state.detail;
  const [renderArr, setRenderArr] = useState([]);
  console.log('arrSend to offer', testArray);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const filterArr = testArray.filter(onlyUnique);

  for (let i = 0; i < filterArr.length; i++) {
    filterArr[i] += 1;
  }

  axios.post('/api/multiOfferings', { filterArr })
    .then((res) => {
      console.log('resdata', res.data);
      setRenderArr(res.data);
    });

  useEffect(() => {
    axios.post('/api/multiOfferings', { filterArr: [1, 2] })
      .then((res) => {
        setRenderArr(res.data);
      });
  }, []);

  return (
    <div>
      {renderArr.map((element) => (
        <Offering
          key={Math.random()}
          name={element.name}
          teaches={element.offering_name}
          star={element.rating}
          desc={element.description}
          photo={element.photo}
        />
      ))}
    </div>
  );
};
export default Offerings;
