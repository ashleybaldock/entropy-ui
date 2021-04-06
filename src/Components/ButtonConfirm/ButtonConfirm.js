import React from 'react';
import { Button, ModalPane, ModalWrapper } from 'Components';
import styles from './ButtonConfirm.module.css';

const Wrapper = ({ hideModal = () => {}, onConfirm }) => {
  return (
    <ModalPane title={'Confirm delete?'}>
      <Button className={styles.button} onClick={(e) => onConfirm()}>
        <div>{'Delete'}</div>
      </Button>
      <Button className={styles.button} onClick={(e) => hideModal()}>
        <div>{'Cancel'}</div>
      </Button>
    </ModalPane>
  );
};

export const ButtonConfirm = ({
  className = '',
  children,
  onConfirm,
  ...props
}) => {
  return (
    <ModalWrapper
      triggerProps={['onClick']}
      trigger={
        <Button onClick={() => {}} className={className}>
          {children}
        </Button>
      }
      childPropsToMapHideTo={['hideModal']}
    >
      <Wrapper hideModal={() => {}} onConfirm={onConfirm} />
    </ModalWrapper>
  );
};
