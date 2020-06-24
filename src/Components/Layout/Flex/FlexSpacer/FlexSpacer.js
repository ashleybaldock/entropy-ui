import React from 'react';
import styles from './FlexSpacer.module.css';

export const FlexSpacer = ({ className = '', ...props }) => {
  return <div className={`${styles.container} ${className}`} {...props}></div>;
};
