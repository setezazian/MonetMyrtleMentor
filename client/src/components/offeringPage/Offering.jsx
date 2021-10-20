import React from 'react';

const Offering = (props) => {
  const {
    name, teaches, star, desc, photo,
  } = props;
  return (
    <div className="offering-wrapper">
      <div className="offering-picture"><img src={photo} alt="Mentor" /></div>
      <div className="offering-body">
        <div className="offering-name">{name}</div>
        <div className="offering-teaches">{teaches}</div>
        <div className="offering-star">{star}</div>
        <div className="offering-desc">{desc}</div>
      </div>
      <button className="offering-button contact-button" type="button">Contact</button>
      <button className="offering-button availablity-button" type="button">Availablity</button>
    </div>
  );
};
export default Offering;
