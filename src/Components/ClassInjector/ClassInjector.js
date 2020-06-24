import React from 'react';

export const ClassInjector = ({ children, className, ...props }) => {
  const onlyChild = React.Children.only(children);

  return React.cloneElement(onlyChild, {
    className: `${
      onlyChild.props.className ? onlyChild.props.className : ''
    } ${className}`,
  });
};
