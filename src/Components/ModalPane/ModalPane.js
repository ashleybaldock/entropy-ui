import React from 'react';
import { FlexColumn } from 'Components';
import styles from './ModalPane.module.css';

export const ModalPane = ({
  className = '',
  onClick = (e) => {},
  title = '',
  children,
  ...props
}) => {
  return (
    <FlexColumn
      className={`${styles.pane} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      {...props}
    >
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </FlexColumn>
  );
};
