import React from 'react';

export const ClassInjector = ({ children, className, ...props }) => {
  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      className: `${
        child.props.className ? child.props.className : ''
      } ${className}`,
    })
  );
};
