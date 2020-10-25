import React from 'react';
import './Modal.css'

// variant: max | md | sm
// animation: 1 | 2
const Modal = ({
  children, close, variant, animation, classes
}) => {
  variant = variant || 'md';
  const closeModal = () => {
    console.log('close modal called')
    // document.body.style.position = 'initial';
    if (window.modalKeyboardEventListener) {
      document.removeEventListener('keydown', keyboardEventListener);
      window.modalKeyboardEventListener = undefined;
    }
    close();
  };

  const keyboardEventListener = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  if (!window.modalKeyboardEventListener) {
    document.addEventListener('keydown', keyboardEventListener);
    window.modalKeyboardEventListener = 1;
  }

  // document.body.style.position = 'fixed';

  return (
    <div className={`speedback-modal ${classes ? classes : ''} shadow`} onClick={(e) => { e.stopPropagation(); e.preventDefault(); closeModal(); }}>
      <div className={`speedback-modal-inner-${variant}`} onClick={(e) => { e.stopPropagation(); }}>
        <div className={`speedback-modal-content-${variant} ${animation ? `animation-${animation}` : ''} shadow`}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;
