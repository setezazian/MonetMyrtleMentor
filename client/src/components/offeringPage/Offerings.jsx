import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';
import CustomCursor from '../CustomCursor/CustomCursor.jsx'

const Offerings = (props) => {
  const [renderArray, setRenderArray] = useState([1, 2]);
  let testArray = [0, 1, 2, 3, 4, 5];

  if (props.location.state !== undefined) {
    testArray = props.location.state.detail;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const filterArr = testArray.filter(onlyUnique);

  for (let i = 0; i < filterArr.length; i++) {
    filterArr[i] += 1;
  }

  useEffect(() => {
    console.log('mount');
    const offerLeng = [];
    axios.get('/api/allOfferings')
      .then((res) => {
        res.data.forEach((element, index) => {
          offerLeng.push(index + 1);
        });
        return axios.post('/api/multiOfferings', { filterArr: offerLeng });
      })
      .then((res) => {
        setRenderArray(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log('testArr', testArray);
    axios.post('/api/multiOfferings', { filterArr })
      .then((res) => {
        setRenderArray(res.data);
      })
      .catch((err) => console.error(err));
  }, [testArray]);

  return (
    <>
    <div className="offerings-overall">
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
    </>
  );
};
export default Offerings;
