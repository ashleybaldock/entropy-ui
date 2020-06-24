import React from 'react';
import { action } from '@storybook/addon-actions';
import { Toggle } from './Toggle';

export default {
  title: 'Toggle',
  component: Toggle,
};

export const InteractiveToggle = () => {
  const [toggled, setToggled] = React.useState(true);
  return <Toggle toggled={toggled} onToggle={() => setToggled(!toggled)} />;
};

export const ToggleOn = () => (
  <Toggle toggled={true} onToggle={action('toggled')} />
);

export const DisabledToggleOn = () => (
  <Toggle toggled={true} disabled onToggle={action('toggled')} />
);

export const ToggleOff = () => (
  <Toggle toggled={false} onToggle={action('toggled')} />
);

export const DisabledToggleOff = () => (
  <Toggle toggled={false} disabled onToggle={action('toggled')} />
);
