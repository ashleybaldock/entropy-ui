import React from 'react';
import { formatRgb } from 'utility/colour';
import styles from './Handle.module.css';

const handleRadiusMultiplier = 0.07;

export const Handle = ({
  radius,
  rgb,
  x,
  y,
  stroke = 'black',
  className = '',
  ...props
}) => {
  // const contrastForRgb = ({ r, g, b }) =>
  //   r * 0.299 + g * 0.587 + b * 0.114 > 140 ? '#000' : '#FFF';

  const contrastForRgb = ({ r, g, b }) =>
    r * 0.299 + g * 0.587 + b * 0.114 > 140 ? 'dark' : 'light';

  return (
    <circle
      className={`${styles.handle} ${styles[contrastForRgb(rgb)]} ${className}`}
      cx={x}
      cy={y}
      r={radius * handleRadiusMultiplier}
      fill={formatRgb(rgb)}
      // stroke={contrastForRgb(rgb)}
      {...props}
    />
  );
};
