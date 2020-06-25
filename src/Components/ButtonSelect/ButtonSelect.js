import React from 'react';
import styles from './ButtonSelect.module.css';

export const ButtonSelectOption = ({ option, children }) => children;

export const ButtonSelectRow = (props) => (
  <ButtonSelect {...props} vertical={false} />
);

export const ButtonSelectColumn = (props) => (
  <ButtonSelect {...props} vertical={true} />
);

const ButtonSelect = ({
  vertical = false,
  disabled = false,
  children,
  selected,
  onChange = (newValue) => {},
  className = '',
}) => {
  return (
    <ul
      className={`${styles.options} ${
        vertical ? styles.vertical : styles.horizontal
      } ${className}`}
    >
      {React.Children.map(children, (child) => (
        <li
          className={selected === child.props.option ? styles.selected : ''}
          onClick={() => onChange(child.props.option)}
        >
          {child}
        </li>
      ))}
    </ul>
  );
};
