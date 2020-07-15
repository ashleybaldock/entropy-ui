import React from 'react';
import styles from './FlexBase.module.css';

const defaultWrapper = <div></div>;

export const FlexBase = ({
  children,
  className = '',
  flexDirection = 'row',
  reverse = false,
  alignItems = undefined,
  alignContent = 'stretch',
  justifyContent = undefined,
  flex = '0 1 auto',
  flexWrap = 'nowrap',
  alignSelf = 'auto',
  wrapperElement = defaultWrapper,
  style = {},
  ...props
}) => {
  const onlyWrapperElement = React.Children.only(wrapperElement);
  return React.cloneElement(onlyWrapperElement, {
    ...onlyWrapperElement.props,
    ...props,
    children,
    className: `${styles.flex} ${className} ${
      onlyWrapperElement.props.className
        ? onlyWrapperElement.props.className
        : ''
    }`,
    style: {
      display: 'flex',
      flexDirection: reverse ? `${flexDirection}-reverse` : flexDirection,
      alignItems,
      alignContent,
      justifyContent,
      flex,
      flexWrap,
      alignSelf,
      ...style,
    },
  });
};
