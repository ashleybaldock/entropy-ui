import React from 'react';
import styles from './Modal.module.css';

export const Modal = ({ children, showing, closeModal }) => {
  const [mouseDowned, setMouseDowned] = React.useState(false);

  return showing ? (
    <div
      className={styles.modalBackground}
      onMouseDown={(e) => e.currentTarget === e.target && setMouseDowned(true)}
      onMouseUp={(e) => {
        if (mouseDowned && e.currentTarget === e.target) {
          e.stopPropagation();
          e.preventDefault();
          setMouseDowned(false);
          closeModal(e);
        }
      }}
      onTouchStart={(e) => e.currentTarget === e.target && setMouseDowned(true)}
      onTouchEnd={(e) => {
        if (mouseDowned && e.currentTarget === e.target) {
          e.stopPropagation();
          e.preventDefault();
          setMouseDowned(false);
          closeModal(e);
        }
      }}
    >
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
};
