import React from 'react';
import { Modal } from 'Components';

const addFunctionToChildProps = (child, propsNamesToMap, func) =>
  propsNamesToMap.reduce((acc, propName) => {
    if (child.props[propName] && typeof child.props[propName] === 'function') {
      return {
        ...acc,
        [propName]: (...args) => {
          child.props[propName](...args);
          func();
        },
      };
    }
    throw new Error(
      `propsNamesToMap must be array of real function props on child, errant prop: ${propName}`
    );
  }, {});

export const ModalWrapper = ({
  children,
  triggerProps = [],
  childPropsToMapHideTo = [],
  trigger,
}) => {
  const [showing, setShowing] = React.useState(false);

  const show = () => setShowing(true);

  const hide = () => setShowing(false);

  return (
    <>
      {React.cloneElement(
        trigger,
        addFunctionToChildProps(trigger, triggerProps, show)
      )}
      <Modal showing={showing} closeModal={hide}>
        {childPropsToMapHideTo.length > 0
          ? React.Children.map(children, (child) =>
              React.cloneElement(
                child,
                addFunctionToChildProps(child, childPropsToMapHideTo, hide)
              )
            )
          : children}
      </Modal>
    </>
  );
};
