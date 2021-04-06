import React from 'react';
import { ClassInjector } from 'Components';
import styles from './OverflowScroll.module.css';

export const OverflowScroll = ({
  x = false,
  y = true,
  children,
  className = '',
  ...props
}) => (
  <ClassInjector
    className={`${styles.overflowScroll} ${x ? styles.x : ''} ${
      y ? styles.y : ''
    } ${className}`}
    {...props}
  >
    {children}
  </ClassInjector>
);
