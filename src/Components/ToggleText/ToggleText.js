import React from 'react';
import { FlexRow, Toggle } from 'Components';
import styles from './ToggleText.module.css';

export const ToggleText = ({
  toggled,
  onToggle,
  disabled = false,
  className = '',
  toggleClassName = '',
  children,
  ...props
}) => {
  return (
    <FlexRow
      onClick={onToggle}
      alignItems={'center'}
      className={`${styles.c} ${toggled ? styles.toggled : ''} ${disabled ? styles.disabled : ''} ${className}`}
    >
      <Toggle
        toggled={toggled}
        onToggle={onToggle}
        disabled={disabled}
        className={toggleClassName}
      />
      <FlexRow className={styles.text}>{children}</FlexRow>
    </FlexRow>
  );
};
