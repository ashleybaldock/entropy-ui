import React from 'react';
import { FlexColumn, FlexRow } from '../';
import styles from './SocialLink.module.css';

const CircleFrame = ({ className = '', children, ...props }) => {
  return (
    <FlexColumn
      alignItems={'center'}
      justifyContent={'center'}
      flex={'0 0 auto'}
      className={`${styles.frame} ${className}`}
      {...props}
    >
      {children}
    </FlexColumn>
  );
};

export const SocialLink = ({
  icon,
  href,
  className = '',
  iconClassName = '',
  children,
  ...props
}) => {
  return (
    <a className={`${styles.socialLink} ${className}`} href={href} {...props}>
      <CircleFrame className={iconClassName}>{icon}</CircleFrame>
      {children && (
        <FlexRow flex={'1 0 auto'} className={styles.socialLinkText}>
          {children}
        </FlexRow>
      )}
    </a>
  );
};
