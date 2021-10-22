import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { loginContext } from '../../context.jsx';

const Offering = (props) => {
  const {
    offeringId, name, teaches, star, desc, photo, mentorId,
  } = props;
  const history = useHistory();
  const { login } = useContext(loginContext);
  const contactHandler = () => {
    if (login) {
      history.push('/offerings/contact', { toId: mentorId, navigatedFrom: '/offerings' });
    } else {
      alert('please login to contact a mentor.');
      history.push('/login');
    }
  };

  const availHandler = () => {
    history.push('/offerings/availabillity', { offeringId });
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
