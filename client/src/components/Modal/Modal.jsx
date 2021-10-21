import React from 'react';
import './Modal.css';

export default function Modal(props) {
  const { component, setComponent } = props;

  function clickHandler(e) {
    if (e.target.id === 'ModalWrap') {
      setComponent(null);
    }
  }

  if (component) {
    return (
      <div id='ModalWrap' onClick={clickHandler}>
        { component }
      </div>
    );
  }
  return null;
}
