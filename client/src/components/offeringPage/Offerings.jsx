import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';

const Offerings = (props) => {
  const { location } = props;
  const [renderArray, setRenderArray] = useState([1, 2]);

  useEffect(() => {
    console.log('mount');
    if (location.state === undefined) {
      console.log('Getting all offerings');
      axios.get('/api/allOfferings')
        .then((res) => {
          setRenderArray(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      console.log('using a search term');
      axios.post('/api/searchOfferings', { search: location.state.detail })
        .then((res) => {
          setRenderArray(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state]);

  return (
    <>
      <div className="offerings-overall">
        {renderArray.map((element) => (
          <Offering
            key={Math.random()}
            offeringId={element.offering_id}
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
