import React from 'react';
import { useHistory } from 'react-router-dom';

const Offering = (props) => {
  const {
    name, teaches, star, desc, photo,
  } = props;
  const history = useHistory();

  const contactHandler = () => {
    history.push('/offerings/contact');
  };

  const availHandler = () => {
    history.push('/offerings/availabillity');
  };

  return (
    <div className="offering-container">
      <div className="offering-wrapper">
        <div className="offering-picture">
          <div className="pic-container">
            <img src={photo} alt="Mentor" />
          </div>
        </div>
        <div className="offering-body">
          <div className="offering-name">{name}</div>
          <div className="offering-teaches">{teaches}</div>
          <div className="offering-star">
            <span className="fas fa-star star" />
            {star}
          </div>
          <div className="offering-desc">{desc}</div>
        </div>
        <button className="offering-button contact-button" type="button" onClick={contactHandler}>Contact</button>
        <button className="offering-button availablity-button" type="button" onClick={availHandler}>Availablity</button>
      </div>
    </div>
  );
};
export default Offering;
