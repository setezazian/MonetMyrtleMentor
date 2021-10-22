import React from 'react';

export default function Modal(props) {
  const { component, setComponent } = props;

  function clickHandler(e) {
    if (e.target.id === 'ModalWrap') {
      setComponent(null);
    }
  }

  if (component) {
    return (
      <div id="ModalWrap" onClick={clickHandler} onKeyDown={clickHandler} role="presentation">
        { component }
      </div>
    );
  }
  return null;
}
