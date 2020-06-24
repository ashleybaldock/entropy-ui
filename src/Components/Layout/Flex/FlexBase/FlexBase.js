import React from 'react';

const defaultWrapper = (<div></div>);

export const FlexBase = ({
  children,
  className = '',
  flexDirection = 'row',
  alignItems = undefined,
  justifyContent = undefined,
  flex = undefined,
  flexGrow = 0,
  flexWrap = 'nowrap',
  wrapperElement = defaultWrapper,
  style = {},
  ...props
}) => {
  const onlyChild = React.Children.only(wrapperElement);
  return (
    React.cloneElement(onlyChild, {
      ...props,
      children,
      className,
      style: {
        display: 'flex',
        flexDirection,
        flex,
        alignItems,
        justifyContent,
        flexWrap,
        ...style,
      }
    })
  );
};
