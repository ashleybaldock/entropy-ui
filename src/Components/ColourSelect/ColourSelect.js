import React from 'react';
import { FlexRow } from 'Components';
import { hsvToRgb, rgbToHsv, formatRgb } from 'utility';
import { HueControl } from './HueControl';
import { SaturationControl } from './SaturationControl';
import { ValueControl } from './ValueControl';
import styles from './ColourSelect.module.css';

const pathWidthMultiplier = 0.17;

const currentRadiusMultiplier = 1 / 3;

export const HuePicker = ({ hue, onChange }) => {
  return (
    <HsvPicker
      active={true}
      hsv={{ h: hue, s: 1, v: 1 }}
      modifySaturation={false}
      modifyValue={false}
      hueOffsetMode={false}
      showColour={false}
      showText={true}
      text={`=${(hue * 359).toFixed(0)}°`}
      onChange={(hsv) => onChange(hsv.h)}
    />
  );
};

export const HueOffsetPicker = ({ hueOffset, onChange }) => {
  return (
    <HsvPicker
      active={true}
      hsv={{ h: hueOffset, s: 1, v: 1 }}
      modifySaturation={false}
      modifyValue={false}
      hueOffsetMode={true}
      showColour={false}
      showText={true}
      text={`+${(hueOffset * 359).toFixed(0)}°`}
      onChange={(hsv) => onChange(hsv.h)}
    />
  );
};

export const RgbPicker = ({ rgb, active, onChange }) => {
  return (
    <HsvPicker
      active={active}
      hsv={rgb ? rgbToHsv(rgb) : { h: 0, s: 0, v: 0 }}
      modifySaturation={true}
      modifyValue={true}
      hueOffsetMode={false}
      onChange={(hsv) => onChange(hsvToRgb(hsv))}
    />
  );
};

export const ColourSelect = ({ props }) => <RgbPicker {...props} />;

export const HsvPicker = ({
  active,
  hsv,
  onChange,
  modifySaturation = true,
  modifyValue = true,
  showColour = true,
  hueOffsetMode = false,
  showText = false,
  text = '',
}) => {
  const containerRef = React.useRef(null);

  const radius = 100;

  return (
    <FlexRow className={styles.container}>
      <svg
        ref={containerRef}
        className={styles.colourSelect}
        viewBox="-10 -10 220 220"
      >
        <g
          fill="none"
          strokeWidth={radius * pathWidthMultiplier}
          transform="translate(100,100)"
        >
          <HueControl
            containerRef={containerRef}
            hsv={hsv}
            radius={radius}
            onChange={onChange}
            offsetMode={hueOffsetMode}
          />
          {active ? (
            <>
              {!hueOffsetMode && modifySaturation && (
                <SaturationControl
                  containerRef={containerRef}
                  hsv={hsv}
                  radius={radius}
                  onChange={onChange}
                />
              )}
              {!hueOffsetMode && modifyValue && (
                <ValueControl
                  containerRef={containerRef}
                  hsv={hsv}
                  radius={radius}
                  onChange={onChange}
                />
              )}
              {!hueOffsetMode && showColour && (
                <circle
                  className={styles.currentColour}
                  r={radius * currentRadiusMultiplier}
                  fill={formatRgb(hsvToRgb(hsv))}
                  stroke="transparent"
                  onClick={() => onChange({ h: hsv.h, s: 1, v: 1 })}
                />
              )}
              {showText && (
                <text
                  className={styles.indicatorText}
                  y="0"
                  fill="white"
                  width="50%"
                  x="0"
                >
                  {text}
                </text>
              )}
            </>
          ) : (
            <text
              className={styles.instructionText}
              y="0"
              fill="white"
              width="50%"
              x="0"
            >
              Tap a colour
            </text>
          )}
        </g>
      </svg>
    </FlexRow>
  );
};
