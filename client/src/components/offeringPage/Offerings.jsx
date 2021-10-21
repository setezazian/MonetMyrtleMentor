import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';

const Offerings = (props) => {
  let testArray;
  if (props.location.state === undefined) {
    testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  } else {
    testArray = props.location.state.detail;
  }
  const [renderArray, setRenderArray] = useState([1, 2]);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const filterArr = testArray.filter(onlyUnique);

  for (let i = 0; i < filterArr.length; i++) {
    filterArr[i] += 1;
  }

  useEffect(() => {
    let offerLeng = [];
    axios.get('/api/allOfferings')
      .then((res) => {
        res.data.forEach((element, index) => {
          offerLeng.push(index + 1);
        });
      })
      .catch((err) => console.error(err));

    axios.post('/api/multiOfferings', { filterArr: offerLeng })
      .then((res) => {
        setRenderArray(res.data);
      })
      .catch((err) => console.error(err));
      console.log('mount')
  }, []);

  useEffect(() => {
    axios.post('/api/multiOfferings', { filterArr })
      .then((res) => {
        setRenderArray(res.data);
        console.log('!');
      })
      .catch((err) => console.error(err));
  }, [testArray]);
  console.log(renderArray);
  return (
    <div>
      {renderArray.map((element) => (
        <Offering
          key={Math.random()}
          name={element.name}
          teaches={element.offering_name}
          star={element.rating}
          desc={element.description}
          photo={element.photo}
          mentorId={element.mentor_id}
        />
      ))}
    </div>
  );
};
export default Offerings;
