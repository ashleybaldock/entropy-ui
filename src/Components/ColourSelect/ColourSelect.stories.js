import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { FlexColumn, FlexRow } from 'Components';
import {
  RgbPicker,
  HsvPicker,
  HueOffsetPicker,
  HuePicker,
} from './ColourSelect';

export default {
  title: 'ColourSelect',
  component: RgbPicker,
  decorators: [withKnobs],
};

const Label = ({ children }) => {
  return <div style={{ color: '#fff' }}>{children}</div>;
};

const PickerContainer = ({ children }) => {
  return (
    <FlexColumn
      style={{ width: '300px' }}
      alignItems={'center'}
      flex={'0 0 auto'}
    >
      {children}
    </FlexColumn>
  );
};

export const Demo = () => {
  const [rgb, setRgb] = React.useState({ r: 255, g: 255, b: 0 });
  const [hsv, setHsv] = React.useState({ h: 0, s: 1, v: 1 });
  const [hueOffset, setHueOffset] = React.useState(0);

  return (
    <FlexRow flexWrap={'wrap'}>
      <PickerContainer>
        <Label>&lt;RgbPicker&gt;</Label>
        <RgbPicker
          active={true}
          rgb={rgb}
          onChange={({ r, g, b }) => setRgb({ ...rgb, r, g, b })}
        />
      </PickerContainer>
      <PickerContainer>
        <Label>&lt;HsvPicker&gt;</Label>
        <HsvPicker
          active={true}
          hsv={hsv}
          onChange={({ h, s, v }) => setHsv({ ...hsv, h, s, v })}
        />
      </PickerContainer>
      <PickerContainer>
        <Label>&lt;HuePicker&gt;</Label>
        <HuePicker hue={hsv.h} onChange={(h) => setHsv({ ...hsv, h })} />
      </PickerContainer>
      <PickerContainer>
        <Label>&lt;HueOffsetPicker&gt;</Label>
        <HueOffsetPicker
          hueOffset={hueOffset}
          onChange={(h) => setHueOffset(h)}
        />
      </PickerContainer>
    </FlexRow>
  );
};

export const HsvPickerProps = () => {
  const [hsv, setHsv] = React.useState({ h: 0, s: 1, v: 1 });
  return (
    <PickerContainer>
      <HsvPicker
        active={boolean('Active', true)}
        modifySaturation={boolean('Saturation', true)}
        modifyValue={boolean('Value', true)}
        showColour={boolean('Show Colour', true)}
        hueOffsetMode={boolean('Offset mode', false)}
        showText={boolean('Show text', false)}
        text={text('Text', 'test')}
        hsv={hsv}
        onChange={({ h, s, v }) => setHsv({ ...hsv, h, s, v })}
      />
    </PickerContainer>
  );
};

export const HuePickerProps = () => {
  const [hue, setHue] = React.useState(0);
  return (
    <PickerContainer>
      <HuePicker hue={hue} onChange={(h) => setHue(h)} />
    </PickerContainer>
  );
};

export const HueOffsetPickerProps = () => {
  const [hueOffset, setHueOffset] = React.useState(0);
  return (
    <PickerContainer>
      <HueOffsetPicker
        hueOffset={hueOffset}
        onChange={(h) => setHueOffset(h)}
      />
    </PickerContainer>
  );
};
