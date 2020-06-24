import React from 'react';
import { action } from '@storybook/addon-actions';
import { ToggleText } from './ToggleText';

export default {
  title: 'ToggleText',
  component: ToggleText,
};

export const InteractiveToggleText = () => {
  const [toggled, setToggled] = React.useState(true);
  return <ToggleText toggled={toggled} onToggle={() => setToggled(!toggled)}>Example Toggle Text</ToggleText>;
};

export const ToggleTextOn = () => (
  <ToggleText toggled={true} onToggle={action('toggled')}>Example toggled on</ToggleText>
);

export const DisabledToggleTextOn = () => (
  <ToggleText toggled={true} disabled onToggle={action('toggled')}>Disabled example toggled on</ToggleText>
);

export const ToggleTextOff = () => (
  <ToggleText toggled={false} onToggle={action('toggled')}>Example toggled off</ToggleText>
);

export const DisabledToggleTextOff = () => (
  <ToggleText toggled={false} disabled onToggle={action('toggled')}>Disabled example toggled off</ToggleText>
);
