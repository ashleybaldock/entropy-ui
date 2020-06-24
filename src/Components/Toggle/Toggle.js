import React from 'react';
import { CrossIcon, FlexRow, TickIcon } from 'Components';
import styles from './Toggle.module.css';

export const Toggle = ({
  toggled,
  onToggle = () => {},
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <FlexRow
      onClick={() => onToggle()}
      alignItems={'center'}
      className={`${styles.toggle} ${toggled ? styles.toggled : ''} ${
        disabled ? styles.disabled : ''
      } ${className}`}
      {...props}
    >
      <FlexRow
        justifyContent={'center'}
        alignItems={'center'}
        className={styles.knob}
      >
        <TickIcon className={styles.tick} />
        <CrossIcon className={styles.cross} />
      </FlexRow>
    </FlexRow>
  );
};
