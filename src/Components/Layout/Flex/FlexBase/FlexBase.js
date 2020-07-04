import React from 'react';

const defaultWrapper = <div></div>;

export const FlexBase = ({
  children,
  className = '',
  flexDirection = 'row',
  reverse = false,
  alignItems = undefined,
  alignContent = 'stretch',
  justifyContent = undefined,
  flex = undefined,
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
    className: `${className} ${
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
