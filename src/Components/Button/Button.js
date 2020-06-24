import React from 'react';
import styles from './Button.module.css';

export const Button = ({
  className = '',
  disabled = false,
  primary = false,
  active = false,
  stopPropagation = true,
  children,
  onClick = (e) => {},
}) => {
  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ''} ${
        active ? styles.active : ''
      }
        ${primary ? styles.primary : ''} ${className}`}
      onClick={(e) => {
        stopPropagation && e.stopPropagation();
        !disabled && onClick(e);
      }}
    >
      {children}
    </div>
  );
};
