import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offering from './Offering.jsx';

const Offerings = (props) => {
  const { location } = props;
  const [renderArray, setRenderArray] = useState([]);

  useEffect(() => {
    console.log('location.state: ', location.state);
    console.log('mount');
    let searchTermExists = true;
    if (location.state === undefined || location.state.detail === undefined || location.state.detail === '') {
      searchTermExists = false;
    }

    if (searchTermExists) {
      console.log('using a search term');
      axios.post('/api/searchOfferings', { search: location.state.detail })
        .then((res) => {
          setRenderArray(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      console.log('Getting all offerings');
      axios.get('/api/allOfferings')
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
