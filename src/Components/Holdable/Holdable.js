import React from 'react';

export const Holdable = ({ onHold, delay = 300, children }) => {
  const [timer, setTimer] = React.useState(null);

  const startTimer = React.useCallback(
    (e) => {
      e.persist();
      if (timer) {
        window.clearTimeout(timer);
      }
      setTimer(
        window.setTimeout(() => {
          setTimer(null);
          onHold(e);
        }, delay)
      );
    },
    [delay, onHold, timer]
  );

  const endTimer = React.useCallback(
    (e, callback) => {
      if (callback) {
      }
      if (timer) {
        window.clearTimeout(timer);
        setTimer(null);
        if (callback) {
          callback(e);
        }
      }
    },
    [timer]
  );

  return React.Children.only(
    React.cloneElement(children, {
      onMouseDown: startTimer,
      onTouchStart: startTimer,
      onTouchEnd: (e) => endTimer(e, children.props.onClick),
      onClick: (e) => endTimer(e, children.props.onClick),
      onMouseLeave: endTimer,
    })
  );
};
