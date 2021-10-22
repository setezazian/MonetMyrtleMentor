import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';
import CustomCursor from '../CustomCursor/CustomCursor.jsx'

const Offerings = (props) => {
  const [renderArray, setRenderArray] = useState([1, 2]);
  const [testArray, setTestArray] = useState([0, 1, 2, 3, 4, 5]);

  useEffect(() => {
    console.log('mount');
    if (props.location.state === undefined) {
      console.log('Getting all offerings');
      axios.get('/api/allOfferings')
        .then((res) => {
          setRenderArray(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      console.log('using a search term');
      axios.post('/api/searchOfferings', { search: props.location.state.detail })
        .then((res) => {
          setRenderArray(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [props.location.state]);

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
