import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';

const Offerings = (props) => {
  const testArray = props.location.state.detail;
  const [renderArr, setRenderArr] = useState([1, 2]);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  console.log('testArr',testArray);
  const filterArr = testArray.filter(onlyUnique);

  for (let i = 0; i < filterArr.length; i++) {
    filterArr[i] += 1;
  }

  axios.post('/api/multiOfferings', { filterArr })
    .then((res) => {
      setRenderArr(res.data);
    })
    .catch((err) => console.error(err));

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
